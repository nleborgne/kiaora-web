import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useApartmentsQuery } from "../generated/graphql";
import React from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
const Index = () => {
    const [{ data }] = useApartmentsQuery();
    return (
        <Layout variant="regular">
            {!data ? (
                <div>loading...</div>
            ) : (
                data.apartments.map((apartment) => (
                    <div key={apartment.id}>{apartment.name}</div>
                ))
            )}
            <NextLink href="create-apartment">
                <Button colorScheme="teal">+&nbsp;Add apartment</Button>
            </NextLink>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
