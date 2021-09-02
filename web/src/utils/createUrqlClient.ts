import { dedupExchange, fetchExchange, stringifyVariables } from "urql";
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import {
    LogoutMutation,
    MeQuery,
    MeDocument,
    LoginMutation,
    RegisterMutation,
    DeleteApartmentMutationVariables,
    UpdateApartmentMutationVariables,
    DeleteUserMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";
import { devtoolsExchange } from "@urql/devtools";
import { isServer } from "./isServer";

export const errorExchange: Exchange =
    ({ forward }) =>
    (ops$) => {
        return pipe(
            forward(ops$),
            tap(({ error }) => {
                if (error?.message.includes("not authenticated")) {
                    Router.replace("/login");
                }
            })
        );
    };

export const cursorPagination = (): Resolver => {
    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter(
            (info) => info.fieldName === fieldName
        );

        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }

        const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
        const typename = cache.resolve(
            cache.resolve(entityKey, fieldKey) as string,
            "__typename"
        ) as string;
        const isItInTheCache = cache.resolve(
            cache.resolve(entityKey, fieldKey) as string,
            "apartments"
        );
        let hasMore = true;

        if (
            !Object.keys(fieldArgs).includes("numberOfRooms") &&
            !Object.keys(fieldArgs).includes("price") &&
            !Object.keys(fieldArgs).includes("areaSize")
        ) {
            info.partial = !isItInTheCache;
            let results: string[] = [];
            fieldInfos.forEach((fi) => {
                const key = cache.resolve(entityKey, fi.fieldKey) as string;
                const data = cache.resolve(key, "apartments") as string[];
                const _hasMore = cache.resolve(key, "hasMore") as boolean;
                if (!_hasMore) {
                    hasMore = _hasMore;
                }
                results.push(...data);
            });
            return { __typename: typename, hasMore, apartments: results };
        } else {
            // Filter
            let results: string[] = [];
            fieldInfos.forEach((fi) => {
                const key = cache.resolve(entityKey, fi.fieldKey) as string;
                const data = cache.resolve(key, "apartments") as string[];
                const _hasMore = cache.resolve(key, "hasMore") as boolean;
                if (!_hasMore) {
                    hasMore = _hasMore;
                }
                results = data;
            });
            return { __typename: typename, hasMore, apartments: results };
        }
    };
};

function invalidateAllPosts(cache: Cache) {
    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
    fieldInfos.forEach((fi) => {
        cache.invalidate("Query", "posts", fi.arguments || {});
    });
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
    let cookie = "";
    if (isServer()) {
        cookie = ctx?.req.headers.cookie;
    }
    return {
        url: "http://localhost:4000/graphql",
        fetchOptions: {
            credentials: "include" as const,
            headers: cookie
                ? {
                      cookie,
                  }
                : undefined,
        },
        exchanges: [
            devtoolsExchange,
            dedupExchange,
            cacheExchange({
                keys: {
                    PaginatedApartments: () => null,
                },
                resolvers: {
                    Query: {
                        apartments: cursorPagination(),
                    },
                },
                updates: {
                    Mutation: {
                        deleteUser: (_result, args, cache, _info) => {
                            cache.invalidate({
                                __typename: "User",
                                id: (args as DeleteUserMutationVariables).id,
                            });
                        },
                        updateApartment: (_result, args, cache, _info) => {
                            cache.invalidate({
                                __typename: "Apartment",
                                id: (args as UpdateApartmentMutationVariables)
                                    .id,
                            });
                        },
                        deleteApartment: (_result, args, cache, _info) => {
                            cache.invalidate({
                                __typename: "Apartment",
                                id: (args as DeleteApartmentMutationVariables)
                                    .id,
                            });
                        },
                        createApartment: (_result, _args, cache, _info) => {
                            invalidateAllPosts(cache);
                        },
                        logout: (_result, _args, cache, _info) => {
                            // return null from me query
                            betterUpdateQuery<LogoutMutation, MeQuery>(
                                cache,
                                { query: MeDocument },
                                _result,
                                () => ({ me: null })
                            );
                            Router.replace("/login");
                        },
                        login: (_result, _args, cache, _info) => {
                            betterUpdateQuery<LoginMutation, MeQuery>(
                                cache,
                                { query: MeDocument },
                                _result,
                                (result, query) => {
                                    if (result.login.errors) {
                                        return query;
                                    } else {
                                        return {
                                            me: result.login.user,
                                        };
                                    }
                                }
                            );
                            invalidateAllPosts(cache);
                        },
                        register: (_result, _args, cache, _info) => {
                            betterUpdateQuery<RegisterMutation, MeQuery>(
                                cache,
                                { query: MeDocument },
                                _result,
                                (result, query) => {
                                    if (result.register.errors) {
                                        return query;
                                    } else {
                                        return {
                                            me: result.register.user,
                                        };
                                    }
                                }
                            );
                        },
                    },
                },
            }),
            errorExchange,
            ssrExchange,
            fetchExchange,
        ],
    };
};
