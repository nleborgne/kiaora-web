import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { Layout } from "../components/Layout";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Layout variant="small">
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register(values);
                    console.log(response);
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                        router.push("/");
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
                                Register
                            </Button>
                            <Box ml="auto" mt={3}>
                                <Link href="/login?next=/">login</Link>
                            </Box>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Register);
