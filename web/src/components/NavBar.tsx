import { Box, Button, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { Role } from "../utils/roles";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    let body = null;

    if (fetching) {
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>register</Link>
                </NextLink>
            </>
        );
    } else {
        body = (
            <Flex align="center">
                <HStack mr={4}>
                    {Role.ADMIN === (data.me.role as Role) && (
                        <Link href="user" style={{ textDecoration: "none" }}>
                            <Button variant="blue">Users</Button>
                        </Link>
                    )}
                    {[Role.REALTOR, Role.ADMIN].includes(
                        data.me.role as Role
                    ) && (
                        <Link
                            href="create-apartment"
                            style={{ textDecoration: "none" }}
                        >
                            <Button variant="blue">+&nbsp;Add apartment</Button>
                        </Link>
                    )}
                </HStack>
                <Box mr={2}>{data.me.email}</Box>

                <Button
                    variant="link"
                    onClick={() => {
                        logout();
                    }}
                    isLoading={logoutFetching}
                >
                    Logout
                </Button>
            </Flex>
        );
    }
    return (
        <Flex
            position="sticky"
            top="0"
            zIndex={1}
            p={4}
            ml="auto"
            bg="gray.100"
        >
            <NextLink href="/">
                <Link>
                    <Heading>kia ora</Heading>
                </Link>
            </NextLink>
            <Box ml="auto">{body}</Box>
        </Flex>
    );
};
