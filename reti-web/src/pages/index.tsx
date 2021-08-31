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
        limit: 15,
        cursor: null as null | string,
    });
    const [{ data, fetching }] = useApartmentsQuery({
        variables,
    });

    if (!fetching && !data) {
        return <div>No apartments added</div>;
    }

    return (
        <Layout variant="large">
            {!data && fetching ? (
                <div>loading...</div>
            ) : (
                <>
                    <HStack>
                        <Stack w="20vw" h="90vh">
                            <LeftPanel
                                aptData={data!}
                                fetching={fetching}
                                onClick={() => {
                                    setVariables({
                                        limit: variables.limit,
                                        cursor: data!.apartments.apartments[
                                            data!.apartments.apartments.length -
                                                1
                                        ].createdAt,
                                    });
                                }}
                            />
                        </Stack>
                        <Box w="60vw" h="90vh">
                            <MiddlePanel data={data!} />
                        </Box>
                        <Box w="20vw" h="90vh">
                            <RightPanel />
                        </Box>
                    </HStack>
                </>
            )}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
