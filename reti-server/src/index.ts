import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { ApartmentResolver } from "./resolvers/apartment";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    // Add headers before the routes are defined
    app.use(
        cors({ origin: "https://studio.apollographql.com", credentials: true })
    );

    let RedisStore = connectRedis(session);
    let redisClient = redis.createClient();

    app.use(
        session({
            name: "qid",
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
                secure: __prod__, // cookie only works in https (prod env)
            },
            saveUninitialized: false,
            secret: "qsdqsdqsdqsdqsqsqsdsqd",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ApartmentResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.get("/", (_, res) => {
        res.send("hello");
    });

    app.listen(4000, () => {
        console.log("Server started on localhost:4000");
    });
};

main().catch((error) => {
    console.log(error);
});

console.log("hello world");
