import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "medium" | "large";
interface WrapperProps {
    variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    variant = "medium",
}) => {
    return (
        <Box
            maxW={
                variant === "large"
                    ? "100vw"
                    : variant === "medium"
                    ? "800px"
                    : "400px"
            }
            mt={4}
            w="100%"
            mx="auto"
        >
            {children}
        </Box>
    );
};
