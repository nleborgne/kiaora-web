import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Link from "next/link";
import { Layout } from "../components/Layout";

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Layout variant="small">
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({ options: values });
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        if (typeof router.query.next == "string") {
                            router.push(router.query.next);
                        } else {
                            router.push("/");
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="email"
                            placeholder="email"
                            label="Email"
                        />
                        <Box my={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Flex>
                            <Button
                                type="submit"
                                variant="blue"
                                isLoading={isSubmitting}
                            >
                                Login
                            </Button>
                            <Box ml="auto" mt={3}>
                                <Link href="/register?next=/">register</Link>
                            </Box>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Login);
