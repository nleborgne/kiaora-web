import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { COOKIE_NAME, __prod__ } from "./constants";
import { HelloResolver } from "./resolvers/hello";
import { ApartmentResolver } from "./resolvers/apartment";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";
import { createConnection } from "typeorm";
import { Apartment } from "./entities/Apartment";
import { User } from "./entities/User";
import path from "path";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        // synchronize: true,
        entities: [User, Apartment],
        migrations: [path.join(__dirname, "./migrations/*")],
        cli: {
            migrationsDir: "src/migrations",
        },
    });
    await conn.runMigrations();

    // await Apartment.delete({});

    const app = express();

    app.set("proxy", 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );

    let RedisStore = connectRedis(session);
    let redis = new Redis(process.env.REDIS_URL);

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
                secure: __prod__, // cookie only works in https (prod env)
                domain: __prod__ ? "*.builtbynlb.com" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ApartmentResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }): MyContext => ({ req, res, redis }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.get("/", (_, res) => {
        res.send("hello");
    });

    app.listen(parseInt(process.env.PORT), () => {
        console.log("Server started on localhost:4000");
    });
};

main().catch((error) => {
    console.log(error);
});
