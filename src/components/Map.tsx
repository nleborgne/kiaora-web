import React from "react";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";
import mapStyles from "../utils/mapStyles";
import { Apartment, ApartmentsQuery } from "../generated/graphql";
import { Box, Heading } from "@chakra-ui/react";
import { ctx } from "../pages/_app";
import ApartmentIcon from "../../public/apartment.png";

interface MapProps {
    data: ApartmentsQuery;
}

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

export const Map: React.FC<MapProps> = ({ data }) => {
    const { state, update } = React.useContext(ctx);

    const [position, setPosition] = React.useState({
        lat: 48.856614,
        lng: 2.3522219,
    });

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
    });

    const mapRef = React.useRef<google.maps.Map<Element> | null>(null);

    const onLoad = (map: google.maps.Map<Element>): void => {
        mapRef.current = map;
    };

    const onUnmount = (): void => {
        mapRef.current = null;
    };

    const onMarkerClick = (apartment: Apartment) => {
        update({ selectedApartment: apartment });
    };

    React.useEffect(() => {
        if (state.selectedApartment) {
            setPosition({
                lat: state.selectedApartment.latitude,
                lng: state.selectedApartment.longitude,
            });
        }
    }, [state]);

    if (!isLoaded) {
        return <div>Map loading...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            options={{
                styles: mapStyles,
                disableDefaultUI: true,
                zoomControl: true,
            }}
            zoom={3}
            center={position}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {data?.apartments.apartments.map((apartment) => (
                <Marker
                    key={apartment.id}
                    position={{
                        lat: apartment.latitude,
                        lng: apartment.longitude,
                    }}
                    onClick={() => onMarkerClick(apartment)}
                    icon={{
                        url: ApartmentIcon.src,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                    }}
                ></Marker>
            ))}
            {state.selectedApartment && state.selectedApartment.id !== "" && (
                <InfoWindow
                    position={{
                        lat: state.selectedApartment.latitude,
                        lng: state.selectedApartment.longitude,
                    }}
                    onCloseClick={() => update({ selectedApartment: null })}
                >
                    <Box>
                        <Heading fontSize="large">
                            {state.selectedApartment.name}
                        </Heading>
                        <Heading fontSize="small">
                            ${state.selectedApartment.price} per month
                        </Heading>
                        <Heading fontSize="small">
                            {state.selectedApartment.numberOfRooms} rooms,{" "}
                            {state.selectedApartment.areaSize} square meters,
                            floor n° {state.selectedApartment.floor}
                        </Heading>
                        <div>{state.selectedApartment.description}</div>
                    </Box>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};
