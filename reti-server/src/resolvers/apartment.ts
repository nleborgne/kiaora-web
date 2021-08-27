import { isAuth } from "src/middleware/isAuth";
import { MyContext } from "src/types";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { Apartment } from "../entities/Apartment";

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
}

@Resolver()
export class ApartmentResolver {
    @Query(() => [Apartment])
    async apartments(): Promise<Apartment[]> {
        return Apartment.find();
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
    ): Promise<Apartment | null> {
        return Apartment.create({
            ...input,
            realtorId: req.session.userId,
        }).save();
    }

    @Mutation(() => Apartment, { nullable: true })
    @UseMiddleware(isAuth)
    async updateApartment(
        @Arg("id") id: string,
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
