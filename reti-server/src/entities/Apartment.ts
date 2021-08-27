import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Apartment extends BaseEntity {
    @Field(() => String)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => String)
    @Column()
    description: string;

    @Field(() => Number)
    @Column({ type: "int" })
    floor: number;

    @Field(() => Number)
    @Column({ type: "int" })
    areaSize: number;

    @Field(() => Number)
    @Column({ type: "float" })
    price: number;

    @Field(() => Number)
    @Column({ type: "int" })
    numberOfRooms: number;

    @Field()
    @Column()
    realtorId: string;

    @ManyToOne(() => User, (user) => user.apartments)
    realtor: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
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
