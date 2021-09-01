import { Box } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
    variant: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
    return (
        <Box maxW="1920px" mx="auto">
            <NavBar />
            <Wrapper variant={variant}>{children}</Wrapper>
        </Box>
    );
};
