import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
import { createCtx, IContext } from "../utils/context";

const sampleContext: IContext = {
    selectedApartment: {
        id: "",
        name: "",
        description: "",
        floor: 0,
        latitude: 0,
        longitude: 0,
        numberOfRooms: 0,
        price: 0,
        realtorId: "",
        areaSize: 0,
        createdAt: "",
        updatedAt: "",
        address:"",
        isRented: false,
        realtor: {
            id: "",
            email: "",
            role: "",
            createdAt: "",
            updatedAt: ""
        }
    },
};

export const [ctx, ApartmentProvider] = createCtx(sampleContext);

function MyApp({ Component, pageProps }: any) {
    return (
        <ApartmentProvider>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </ApartmentProvider>
    );
}

export default MyApp;
