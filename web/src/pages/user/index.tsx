import React from "react";
import { withUrqlClient } from "next-urql";
import { useDeleteUserMutation, useUsersQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Table, Thead, Tr, Th, Tbody, Td, IconButton } from "@chakra-ui/react";
import { Layout } from "../../components/Layout";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useIsAuth } from "../../utils/useIsAuth";
import { Role } from "../../utils/roles";
import NextLink from "next/link";

const Index: React.FC<{}> = ({}) => {
    useIsAuth([Role.ADMIN]);

    const [{ data, fetching }] = useUsersQuery();
    const [, deleteUser] = useDeleteUserMutation();
    return (
        <Layout variant="medium">
            <Table variant="simple" colorScheme="telegram">
                <Thead>
                    <Tr>
                        <Th>email</Th>
                        <Th>role</Th>
                        <Th>actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.users.map((user) => (
                        <Tr>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <NextLink
                                    href="/user/edit/[id]"
                                    as={`/user/edit/${user.id}`}
                                >
                                    <IconButton
                                        icon={<EditIcon />}
                                        aria-label="Edit user"
                                    />
                                </NextLink>
                                <IconButton
                                    ml={4}
                                    icon={<DeleteIcon />}
                                    aria-label="Delete user"
                                    onClick={() => {
                                        deleteUser({ id: user.id });
                                    }}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Index);
