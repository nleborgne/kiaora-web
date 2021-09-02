import { Box, Button, FormLabel } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { SelectControl } from "formik-chakra-ui";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { useUpdateUserMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetUserFromUrl } from "../../../utils/useGetUserFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";

const EditUser = ({}) => {
    useIsAuth();
    const router = useRouter();
    const intId = router.query.id;
    const [{ data, fetching }] = useGetUserFromUrl();
    const [, updateUser] = useUpdateUserMutation();

    if (fetching) {
        return (
            <Layout variant="small">
                <div>loading...</div>
            </Layout>
        );
    }
    if (!data?.user) {
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
                    email: data.user.email,
                    role: data.user.role,
                }}
                onSubmit={async (values) => {
                    await updateUser({
                        id: "" + intId,
                        input: {
                            ...values,
                        },
                    });
                    router.push("/user");
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="email"
                            placeholder="email"
                            label="Email"
                        />
                        <Box my={4} />
                        <FormLabel>Role</FormLabel>
                        <SelectControl
                            name="role"
                            selectProps={{ placeholder: "Select option" }}
                        >
                            <option value="CLIENT">Client</option>
                            <option value="REALTOR">Realtor</option>
                            <option value="ADMIN">Admin</option>
                        </SelectControl>
                        <Button
                            type="submit"
                            variant="blue"
                            isLoading={isSubmitting}
                            mt={4}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(EditUser);
