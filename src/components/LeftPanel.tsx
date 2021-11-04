import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Link,
    Text,
} from "@chakra-ui/react";
import React from "react";
import {
    ApartmentsQuery,
    useDeleteApartmentMutation,
    useMeQuery,
} from "../generated/graphql";
import { ctx } from "../pages/_app";
import { Role } from "../utils/roles";
import NextLink from "next/link";

interface LeftPanelProps {
    aptData: ApartmentsQuery;
    fetching: boolean;
    onClick: () => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
    aptData,
    fetching,
    onClick,
}) => {
    const { state, update } = React.useContext(ctx);
    const [{ data }] = useMeQuery();

    const [, deletePost] = useDeleteApartmentMutation();

    const apartments = aptData.apartments.apartments.map((ap, index) => {
        return !ap ? null : (
            <Box
                key={index}
                p={5}
                shadow="md"
                borderWidth="1px"
                _hover={{ bgColor: "#caf0f8" }}
                cursor="pointer"
                transition="0.3s"
                onClick={() => update({ selectedApartment: ap })}
                bg={state.selectedApartment?.id === ap.id ? "#90e0ef" : "white"}
                borderRadius="10px"
                mb={4}
                style={{ contain: "content" }}
            >
                <Heading fontSize="xl">{ap.name}</Heading>
                <Heading my={4} fontSize="large">
                    ${ap.price} / month
                </Heading>
                <Text>{`${ap.numberOfRooms} ${
                    ap.numberOfRooms > 1 ? "rooms" : "room"
                }, ${ap.areaSize} square meters, floor n°${ap.floor}`}</Text>
                {[Role.ADMIN, Role.REALTOR].includes(
                    data?.me?.role as Role
                ) && (
                    <>
                        <Badge
                            variant="subtle"
                            colorScheme={ap.isRented ? "green" : "red"}
                            position="fixed"
                            top="5%"
                            right="2%"
                        >
                            {ap.isRented ? `RENTED` : `NOT RENTED`}
                        </Badge>
                        <Box mt={2} flex="1">
                            <NextLink
                                href="/apartment/edit/[id]"
                                as={`/apartment/edit/${ap.id}`}
                            >
                                <IconButton
                                    as={Link}
                                    icon={<EditIcon />}
                                    aria-label="icon-edit"
                                />
                            </NextLink>
                            <IconButton
                                icon={<DeleteIcon />}
                                aria-label="Delete post"
                                onClick={() => {
                                    deletePost({ id: +ap.id });
                                }}
                                float="right"
                                ml="auto"
                            />
                        </Box>
                    </>
                )}
            </Box>
        );
    });

    return (
        <Box overflow="scroll">
            {apartments}
            {aptData && aptData.apartments.hasMore && (
                <Flex my={4}>
                    <Button isLoading={fetching} mx="auto" onClick={onClick}>
                        Load more
                    </Button>
                </Flex>
            )}
        </Box>
    );
};
