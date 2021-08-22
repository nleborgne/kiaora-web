import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Apartment {
    @Field(() => String)
    @PrimaryKey()
    id: string = v4();

    @Field(() => String)
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Field(() => String)
    @Property({ type: "text" })
    name!: string;

    @Field(() => String)
    @Property({ type: "text" })
    description: string;

    @Field(() => Number)
    @Property({ type: "number" })
    floor: number;

    @Field(() => Number)
    @Property({ type: "number" })
    areaSize: number;

    @Field(() => Number)
    @Property({ type: "number" })
    price: number;

    @Field(() => Number)
    @Property({ type: "number" })
    numberOfRooms: number;
}

/*
  name OK,
  description OK,
  floor OK,
  area size,
  price per month,
  number of rooms,
  valid geolocation coordinates,
  date added,
  associated realtor
*/
