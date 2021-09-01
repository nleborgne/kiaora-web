import {
    Box,
    Heading,
    HStack,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    useRadioGroup,
} from "@chakra-ui/react";
import React from "react";
import { IVariables } from "../types/variables";
import { numberOfRoomsOptions } from "../utils/numberOfRoomsOptions";
import { RadioCard } from "./Radio";

interface RightPanelProps {
    variables: IVariables;
    setVariables: React.Dispatch<React.SetStateAction<IVariables>>;
}

export const RightPanel: React.FC<RightPanelProps> = ({
    variables,
    setVariables,
}) => {
    const [size, setSize] = React.useState<number | null>(null);
    const [price, setPrice] = React.useState<number | null>(null);
    const [numberOfRooms, setNumberOfRooms] = React.useState<number | null>(
        null
    );

    React.useEffect(() => {
        setVariables({
            ...variables,
            areaSize: size,
            price: price,
            numberOfRooms: numberOfRooms,
        });
    }, [size, price, numberOfRooms]);

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "numberOfRooms",
        defaultValue: 1,
        onChange: (value) => {
            setNumberOfRooms(+value);
        },
    });

    const group = getRootProps();

    return (
        <Box h="100%">
            <Box mb={14} w="90%">
                <Heading size="lg" my={4}>
                    Size
                </Heading>
                <Slider
                    defaultValue={100}
                    onChange={(value) => setSize(value)}
                    min={50}
                    max={500}
                    step={50}
                    aria-label="slider-ex-4"
                >
                    <SliderTrack bg="#90e0ef">
                        <SliderFilledTrack bg="#0077b6" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} borderColor="gray.300">
                        <Box color="#0077b6">$</Box>
                    </SliderThumb>
                </Slider>
                Max size : {size} square meters
            </Box>
            <Box mb={14} w="90%">
                <Heading size="lg" my={4}>
                    Price ($)
                </Heading>
                <Slider
                    defaultValue={2500}
                    onChange={(value) => setPrice(value)}
                    min={500}
                    max={5000}
                    step={100}
                    aria-label="slider-ex-4"
                >
                    <SliderTrack bg="#90e0ef">
                        <SliderFilledTrack bg="#0077b6" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} borderColor="gray.300">
                        <Box color="#0077b6">$</Box>
                    </SliderThumb>
                </Slider>
                Max price : ${price}
            </Box>
            <Box mb={14}>
                <Heading size="lg" my={4}>
                    Number of rooms
                </Heading>
                <HStack {...group}>
                    {numberOfRoomsOptions.map((option) => {
                        const radio = getRadioProps({ value: option.value });
                        return (
                            <RadioCard
                                key={option.key}
                                {...radio}
                                isChecked={option.value === numberOfRooms}
                            >
                                {option.key}
                            </RadioCard>
                        );
                    })}
                </HStack>
            </Box>
        </Box>
    );
};
