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
    @Field({ nullable: true })
    isRented?: boolean;
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
    @UseMiddleware(isAuth)
    @Query(() => PaginatedApartments)
    async apartments(
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
        /* Filters */
        @Arg("areaSize", () => Int, { nullable: true }) areaSize: number | null,
        @Arg("price", () => Int, { nullable: true }) price: number | null,
        @Arg("numberOfRooms", () => Int, { nullable: true })
        numberOfRooms: number | null,
        @Ctx() { req }: MyContext
    ): Promise<PaginatedApartments> {
        const user = await User.findOne(req.session.userId);
        let query = "";

        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const replacements: any[] = [realLimitPlusOne];

        let cursorIdx = 1;
        let areaSizeIdx = 1;
        let priceIdx = 1;
        let numberOfRoomsIdx = 1;

        if (cursor) {
            replacements.push(new Date(+cursor));
            cursorIdx = replacements.length;
        }

        if (areaSize) {
            replacements.push(areaSize);
            areaSizeIdx = replacements.length;
        }

        if (price) {
            replacements.push(price);
            priceIdx = replacements.length;
        }

        if (numberOfRooms && numberOfRooms > 0) {
            replacements.push(numberOfRooms);
            numberOfRoomsIdx = replacements.length;
        }

        query = `
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
                ${
                    cursor
                        ? `WHERE a."createdAt" < $${cursorIdx} ${
                              user?.role === "CLIENT"
                                  ? `AND a."isRented" IS FALSE`
                                  : ``
                          }`
                        : `${
                              user?.role === "CLIENT"
                                  ? `WHERE a."isRented" IS FALSE`
                                  : ``
                          }`
                }
                ${areaSize ? `AND a."areaSize" <= $${areaSizeIdx}` : ``}
                ${price ? `AND a."price" <= $${priceIdx}` : ``}
                ${
                    numberOfRooms && numberOfRooms > 0
                        ? `AND a."numberOfRooms" = $${numberOfRoomsIdx}`
                        : ``
                }
                ORDER BY a."createdAt" DESC
                LIMIT $1
                `;

        const apartments = await getConnection().query(query, replacements);
        console.log(apartments);
        return {
            apartments: apartments.slice(0, realLimit),
            hasMore: apartments.length === realLimitPlusOne,
        };
    }

    @Query(() => Apartment, { nullable: true })
    apartment(
        @Arg("id", () => Int!) id: number
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
        Geocode.setApiKey(process.env.GOOGLE_KEY);
        Geocode.enableDebug();
        const code = await Geocode.fromAddress(input.address);
        const { lat, lng } = code.results[0].geometry.location;

        const apartment = await getConnection()
            .createQueryBuilder()
            .update(Apartment)
            .set({ ...input, latitude: lat, longitude: lng })
            .where("id = :id", { id })
            .returning("*")
            .execute();

        return apartment.raw[0];
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteApartment(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const user = await User.findOne(req.session.userId);
        if (user && (user.role === "REALTOR" || user.role === "ADMIN")) {
            await Apartment.delete(id);
            return true;
        }
        return false;
    }
}
