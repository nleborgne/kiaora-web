import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useApartmentsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { LeftPanel } from "../components/LeftPanel";
import { MiddlePanel } from "../components/MiddlePanel";
import { RightPanel } from "../components/RightPanel";

const Index = () => {
    const [variables, setVariables] = React.useState({
        limit: 100,
        cursor: null as null | string,
        areaSize: null as null | number,
        price: null as null | number,
        numberOfRooms: null as null | number,
    });
    const [{ data, fetching }] = useApartmentsQuery({
        variables,
    });

    if (!fetching && !data) {
        return null;
    }

    return (
        <Layout variant="large">
            {!data && fetching ? (
                <div>loading...</div>
            ) : (
                <>
                    <HStack h="85vh">
                        <Stack w="25vw" h="85vh">
                            <LeftPanel
                                aptData={data!}
                                fetching={fetching}
                                onClick={() => {
                                    setVariables({
                                        ...variables,
                                        limit: variables.limit,
                                        cursor: data!.apartments.apartments[
                                            data!.apartments.apartments.length -
                                                1
                                        ].createdAt,
                                        numberOfRooms: variables.numberOfRooms,
                                        areaSize: variables.areaSize,
                                        price: variables.price,
                                    });
                                }}
                            />
                        </Stack>
                        <Box w="60vw" h="85vh">
                            <MiddlePanel data={data!} />
                        </Box>
                        <Box w="25vw" h="85vh">
                            <RightPanel
                                variables={variables}
                                setVariables={setVariables}
                            />
                        </Box>
                    </HStack>
                </>
            )}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
