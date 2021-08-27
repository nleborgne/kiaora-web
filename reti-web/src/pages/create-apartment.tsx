import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useCreateApartmentMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreateApartment: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const [, createApartment] = useCreateApartmentMutation();

    return (
        <Layout variant="small">
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    floor: 0,
                    areaSize: 0,
                    price: 0,
                    numberOfRooms: 0,
                }}
                onSubmit={async (values) => {
                    const { error } = await createApartment({ input: values });
                    if (!error) router.push("/");
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="name"
                            placeholder="apartment name"
                            label="Name"
                        />
                        <Box my={4} />
                        <InputField
                            name="description"
                            placeholder="description"
                            label="Description"
                            textarea
                        />
                        <Box my={4} />
                        <InputField
                            name="floor"
                            placeholder="4"
                            label="Floor"
                            type="number"
                        />
                        <Box my={4} />
                        <InputField
                            name="areaSize"
                            placeholder="90"
                            label="Area size (square meters)"
                            type="number"
                        />
                        <Box my={4} />
                        <InputField
                            name="price"
                            placeholder="1500"
                            label="Price"
                            type="number"
                            price
                        />
                        <Box my={4} />
                        <InputField
                            name="numberOfRooms"
                            placeholder="2"
                            label="Number of rooms"
                            type="number"
                        />
                        <Box my={4} />
                        <Button
                            type="submit"
                            colorScheme="teal"
                            isLoading={isSubmitting}
                        >
                            Add apartment
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(CreateApartment);
