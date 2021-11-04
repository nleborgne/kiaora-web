import { useRouter } from "next/router";
import { useUserQuery } from "../generated/graphql";

export const useGetUserFromUrl = () => {
    const router = useRouter();
    const intId = typeof router.query.id === "string" ? router.query.id : -1;
    return useUserQuery({
        pause: intId === -1,
        variables: {
            userId: "" + intId,
        },
    });
};
