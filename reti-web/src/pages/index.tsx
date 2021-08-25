import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useApartmentsQuery } from "../generated/graphql";

const Index = () => {
    const [{ data }] = useApartmentsQuery();
    return (
        <>
            <NavBar />
            <div>hello world</div>
            {!data ? (
                <div>loading...</div>
            ) : (
                data.apartments.map((apartment) => (
                    <div key={apartment.id}>{apartment.name}</div>
                ))
            )}
        </>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
