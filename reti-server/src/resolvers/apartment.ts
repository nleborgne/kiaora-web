import "dotenv-safe/config";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { Apartment } from "../entities/Apartment";
import { getConnection } from "typeorm";
import Geocode from "react-geocode";
import { User } from "../entities/User";
global.fetch = require("node-fetch");

@InputType()
class ApartmentInput {
    @Field()
    name: string;
    @Field()
    description: string;
    @Field()
    floor: number;
    @Field()
    areaSize: number;
    @Field()
    price: number;
    @Field()
    numberOfRooms: number;
    @Field()
    address: string;
}

@ObjectType()
class PaginatedApartments {
    @Field(() => [Apartment])
    apartments: Apartment[];
    @Field()
    hasMore: boolean;
}

@Resolver()
export class ApartmentResolver {
    @Query(() => PaginatedApartments)
    async apartments(
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
        @Ctx() { req }: MyContext
    ): Promise<PaginatedApartments | null> {

        const user = await User.findOne(req.session.userId);
        console.log('user',user);
        let query = "";

        if (user) {
            // Show only non rented apartments if client role
            if (user.role === "CLIENT") {
                query =
                `
                SELECT 
                a.*,
                json_build_object(
                    'id', u.id,
                    'email', u.email,
                    'role', u.role,
                    'createdAt', u."createdAt",
                    'updatedAt', u."updatedAt"
                ) realtor
                FROM apartment a 
                INNER JOIN public.user u ON u.id = a."realtorId"
                ${cursor ? `WHERE a."createdAt" < $2 AND a."isRented" IS FALSE` : `WHERE a."isRented" IS FALSE`}
                ORDER BY a."createdAt" DESC
                LIMIT $1
                `;
            } else {
                query =
                `
                SELECT 
                a.*,
                json_build_object(
                    'id', u.id,
                    'email', u.email,
                    'role', u.role,
                    'createdAt', u."createdAt",
                    'updatedAt', u."updatedAt"
                ) realtor
                FROM apartment a 
                INNER JOIN public.user u ON u.id = a."realtorId"
                ${cursor ? `WHERE a."createdAt" < $2` : ``}
                ORDER BY a."createdAt" DESC
                LIMIT $1
                `;            
            }  
            
            const realLimit = Math.min(50, limit);
            const realLimitPlusOne = realLimit + 1;
            
            const replacements: any[] = [realLimitPlusOne];
            
            if (cursor) {
                replacements.push(new Date(+cursor));
            }
            
            const apartments = await getConnection().query(query,replacements);
            return {
                apartments: apartments.slice(0, realLimit),
                hasMore: apartments.length === realLimitPlusOne,
            };
        }
        return null;
    }

    @Query(() => Apartment, { nullable: true })
    apartment(
        @Arg("id", () => String) id: string
    ): Promise<Apartment | undefined> {
        return Apartment.findOne(id);
    }

    @Mutation(() => Apartment)
    @UseMiddleware(isAuth)
    async createApartment(
        @Arg("input") input: ApartmentInput,
        @Ctx() { req }: MyContext
    ): Promise<Apartment> {
        Geocode.setApiKey(process.env.GOOGLE_KEY);
        Geocode.enableDebug();
        const code = await Geocode.fromAddress(input.address);
        const { lat, lng } = code.results[0].geometry.location;    
        return Apartment.create({
            ...input,
            latitude: lat,
            longitude: lng,
            isRented: false,
            realtorId: req.session.userId,
        }).save();
    }

    @Mutation(() => Apartment, { nullable: true })
    @UseMiddleware(isAuth)
    async updateApartment(
        @Arg("id") id: number,
        @Arg("input") input: ApartmentInput
    ): Promise<Apartment | null> {
        const apartment = await Apartment.findOne(id);
        if (!apartment) {
            return null;
        }
        await Apartment.update({ id }, input);
        return apartment;
    }

    @Mutation(() => Boolean)
    async deleteApartment(@Arg("id") id: string): Promise<boolean> {
        try {
            await Apartment.delete(id);
            return true;
        } catch {
            return false;
        }
    }
}
