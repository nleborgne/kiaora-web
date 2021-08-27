import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textarea?: boolean;
    price?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    price,
    size: _,
    ...props
}) => {
    let InputOrTextarea = Input as any;
    if (textarea) {
        InputOrTextarea = Textarea;
    }
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputGroup>
                {price && (
                    <InputLeftElement color="gray.500">$</InputLeftElement>
                )}
                <InputOrTextarea {...field} {...props} id={field.name} />
            </InputGroup>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};
