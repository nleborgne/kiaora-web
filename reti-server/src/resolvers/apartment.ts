import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";
import { Apartment } from "../entities/Apartment";

@Resolver()
export class ApartmentResolver {
    @Query(() => [Apartment])
    async apartments(@Ctx() { em }: MyContext): Promise<Apartment[]> {
        return em.find(Apartment, {});
    }

    @Query(() => Apartment, { nullable: true })
    apartment(
        @Arg("id", () => String) id: string,
        @Ctx() { em }: MyContext
    ): Promise<Apartment | null> {
        return em.findOne(Apartment, { id });
    }

    @Mutation(() => Apartment)
    async createApartment(
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Arg("floor") floor: number,
        @Arg("areaSize") areaSize: number,
        @Arg("price") price: number,
        @Arg("numberOfRooms") numberOfRooms: number,
        @Ctx() { em }: MyContext
    ): Promise<Apartment | null> {
        const apartment = em.create(Apartment, {
            name,
            description,
            floor,
            areaSize,
            price,
            numberOfRooms,
        });
        em.persistAndFlush(apartment);
        return em.findOne(Apartment, { name });
    }

    @Mutation(() => Apartment, { nullable: true })
    async updateApartment(
        @Arg("id") id: string,
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Arg("floor") floor: number,
        @Arg("areaSize") areaSize: number,
        @Arg("price") price: number,
        @Arg("numberOfRooms") numberOfRooms: number,
        @Ctx() { em }: MyContext
    ): Promise<Apartment | null> {
        const apartment = await em.findOne(Apartment, { id });
        if (!apartment) {
            return null;
        }
        apartment.name = name;
        apartment.description = description;
        apartment.floor = floor;
        apartment.areaSize = areaSize;
        apartment.price = price;
        apartment.numberOfRooms = numberOfRooms;
        em.persistAndFlush(apartment);
        return apartment;
    }

    @Mutation(() => Boolean)
    async deleteApartment(
        @Arg("id") id: string,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        try {
            await em.nativeDelete(Apartment, { id });
            return true;
        } catch (e) {
            return false;
        }
    }
}
