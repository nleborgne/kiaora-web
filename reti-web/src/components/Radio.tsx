import { useRadio, Box } from "@chakra-ui/react";
import React from "react";

export function RadioCard(props: any) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: "#00b4d8",
                    color: "white",
                    borderColor: "#00b4d8",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                _hover={{
                    bg: "#90e0ef",
                    borderColor: "#90e0ef",
                    transition: "0.5s",
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    );
}
