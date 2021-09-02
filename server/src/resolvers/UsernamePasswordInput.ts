import { Field, InputType } from "type-graphql";

@InputType()
export class UsernamePasswordInput {
    @Field()
    email: string;
    @Field()
    password: string;
}

@InputType()
export class UpdateUserInput {
    @Field()
    email: string;
    @Field()
    role: string;
}
