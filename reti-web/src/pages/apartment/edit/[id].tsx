import React from "react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../../components/Layout";
import { RadioGroupControl } from "formik-chakra-ui";
import { useGetIntId } from "../../../utils/useGetIntId";
import { InputField } from "../../../components/InputField";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Box, Button, FormLabel, Radio, Stack } from "@chakra-ui/react";
import { useUpdateApartmentMutation } from "../../../generated/graphql";
import { useGetApartmentFromUrl } from "../../../utils/useGetApartmentFromUrl";
import { useRouter } from "next/router";

export const EditApartment = ({}) => {
    const router = useRouter();
    const intId = useGetIntId();
    const [{ data, fetching }] = useGetApartmentFromUrl();
    const [, updateApartment] = useUpdateApartmentMutation();

    if (fetching) {
        return (
            <Layout variant="small">
                <div>loading...</div>
            </Layout>
        );
    }
    if (!data?.apartment) {
        return (
            <Layout variant="small">
                <div>Could not find apartment</div>
            </Layout>
        );
    }

    return (
        <Layout variant="small">
            <Formik
                initialValues={{
                    name: data.apartment.name,
                    description: data.apartment.description,
                    floor: data.apartment.floor,
                    areaSize: data.apartment.areaSize,
                    price: data.apartment.price,
                    numberOfRooms: data.apartment.numberOfRooms,
                    address: data.apartment.address,
                    isRented: data.apartment.isRented.toString(),
                }}
                onSubmit={async (values) => {
                    // const { error } = await createApartment({ input: values });
                    // if (!error) router.push("/");
                    await updateApartment({
                        id: intId,
                        input: {
                            ...values,
                            isRented: values.isRented === "true",
                        },
                    });
                    router.push("/");
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
                            label="Price per month"
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
                        <InputField
                            name="address"
                            placeholder="4 Privet Drive Watford"
                            label="Address"
                            type="text"
                        />
                        <Box my={4} />
                        <FormLabel>Is apartment rented?</FormLabel>
                        <RadioGroupControl name="isRented">
                            <Stack direction="row">
                                <Radio value="true">Yes</Radio>
                                <Radio value="false">No</Radio>
                            </Stack>
                        </RadioGroupControl>
                        <Box my={4} />
                        <Button
                            type="submit"
                            variant="blue"
                            isLoading={isSubmitting}
                        >
                            Update apartment
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(EditApartment);
