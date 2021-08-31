import { Box } from "@chakra-ui/react";
import React from "react";
import { Map } from "./Map";
import { ApartmentsQuery } from "../generated/graphql";

interface MiddlePanelProps {
    data: ApartmentsQuery;
}

export const MiddlePanel: React.FC<MiddlePanelProps> = ({ data }) => {
    return (
        <Box h="100%">
            <Map data={data} />
        </Box>
    );
};
