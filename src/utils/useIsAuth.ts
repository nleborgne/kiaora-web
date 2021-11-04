import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = (roles?: string[]) => {
    const router = useRouter();
    const [{ data, fetching }] = useMeQuery();
    useEffect(() => {
        if (!fetching) {
            if (!data?.me || (roles && !roles.includes(data?.me.role))) {
                router.replace("/login?next=" + router.pathname);
            }
        }
    }, [data, router]);
};
