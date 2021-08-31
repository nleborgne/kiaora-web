import { Box, Button, Flex, HStack, Link } from "@chakra-ui/react";
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
            <Flex>
                <Box float="left" pos="fixed" top={2} left={2}>
                    <HStack>
                        {[Role.REALTOR, Role.ADMIN].includes(data.me.role as Role) && (
                            <Link href="create-apartment">
                                <Button colorScheme="teal">+&nbsp;Add apartment</Button>
                            </Link>
                        )}
                    </HStack>
                </Box>
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
        <Flex position="sticky" top="0" zIndex={1} bg="tan" p={4} ml="auto">
            <Box ml="auto">{body}</Box>
        </Flex>
    );
};
