import { useRouter } from "next/router";
import { useApartmentQuery } from "../generated/graphql";

export const useGetApartmentFromUrl = () => {
    const router = useRouter();
    const intId = typeof router.query.id === "string" ? +router.query.id : -1;
    return useApartmentQuery({
        pause: intId === -1,
        variables: {
            apartmentId: intId,
        },
    });
};
