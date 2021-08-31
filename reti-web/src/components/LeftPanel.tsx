import { Badge, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ApartmentsQuery, useMeQuery } from "../generated/graphql";
import { ctx } from "../pages/_app";
import { Role } from "../utils/roles";

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
    const [{data}] = useMeQuery();

    const apartments = aptData.apartments.apartments.map((ap, index) => (
        <Box
            key={index}
            p={5}
            shadow="md"
            borderWidth="1px"
            _hover={{ bgColor: "gray.300" }}
            cursor="pointer"
            transition="0.3s"
            onClick={() => update({ selectedApartment: ap })}
            bg={state.selectedApartment?.id === ap.id ? "blue.200" : "white"}
        >
            <Heading fontSize="xl">{ap.name}</Heading>
            <Heading my={4} fontSize="large">
                ${ap.price} / month
            </Heading>
            <Text>
                {`${ap.numberOfRooms} ${
                    ap.numberOfRooms > 1 ? "rooms" : "room"
                }, ${ap.areaSize} square meters, floor n°${ap.floor}`}
            </Text>
            {[Role.ADMIN, Role.REALTOR].includes(data?.me?.role as Role) && (
                <Badge variant="subtle" colorScheme={ap.isRented ? "green" : "red"}>
                    {ap.isRented ? `RENTED` : `NOT RENTED`}
                </Badge> 
            )}
        </Box>
    ));

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
