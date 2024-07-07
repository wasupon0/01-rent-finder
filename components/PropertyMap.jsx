"use client";

// import pin from "@/assets/images/pin.svg";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { fromAddress, setDefaults } from "react-geocode";
import { toast } from "react-toastify";

import Spinner from "./Spinner";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Google Geocoding API key
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`,
        );

        // Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  // Handle case where geocoding fails
  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading && (
      <div style={{ height: "500px", width: "100%" }}>
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={{ lat: lat, lng: lng }}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI
            fullscreenControl
          >
            <Marker
              position={{ lat: lat, lng: lng }}
              clickable={true}
              onClick={() => {
                toast.info(`lat: ${lat}, lng: ${lng}`, {
                  autoClose: false,
                  hideProgressBar: true,
                  theme: "colored",
                });
              }}
            />
          </Map>
        </APIProvider>
      </div>
    )
  );
};
export default PropertyMap;
