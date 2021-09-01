import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext) {
        // you are not logged in
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }

    @Query(() => [User])
    @UseMiddleware(isAuth)
    async users() {
        return await User.find();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteUser(
        @Arg("id", () => String) id: string,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const user = await User.findOne(req.session.userId);
        if (user && (user.role === "REALTOR" || user.role === "ADMIN")) {
            await User.delete(id);
            return true;
        }
        return false;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }
        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    email: options.email,
                    password: hashedPassword,
                    role: "CLIENT",
                })
                .returning("*")
                .execute();
            console.log("result", result);
            user = result.raw[0];
        } catch (err) {
            console.log(err);
            if (err.detail.includes("already exists")) {
                // duplicate email error
                return {
                    errors: [
                        { field: "email", message: "email alredy exists" },
                    ],
                };
            }
        }

        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne({ where: { email: options.email } });
        if (!user) {
            return {
                errors: [
                    { field: "email", message: "that email doesn't exist" },
                ],
            };
        }
        const valid = await argon2.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [{ field: "password", message: "incorrect password" }],
            };
        }

        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        );
    }
}
