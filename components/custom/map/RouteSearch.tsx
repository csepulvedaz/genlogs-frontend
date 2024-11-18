"use client";

import { useState, useCallback } from "react";
import { LoadScript } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";

import CustomMap from "./CustomMap";
import TopCarriers from "../TopCarriers";
import CityAutocomplete from "./CityAutocomplete";

// Types
import { Carrier } from "@/types/carrierTypes";

// Services
import { getTopCarriersByDirection } from "@/services/carrierServices";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function RouteSearch() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetValues = () => {
    setDirections(null);
    setLoading(false);
    setError(null);
    setCarriers([]);
  };

  const handleSearch = useCallback(async () => {
    resetValues();
    if (!from || !to) {
      setError("Please enter both 'From' and 'To' locations");
      return;
    }
    setLoading(true);
    try {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: from,
          destination: to,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
          region: "US", // Limit to USA
        },
        async (result, status) => {
          setLoading(false);
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            const topCarriers = await getTopCarriersByDirection(from, to);
            setCarriers(topCarriers);
          } else {
            setError(`Error fetching directions: ${status}`);
          }
        }
      );
    } catch (error) {
      setLoading(false);
      setError("Error during search");
      console.error("Error during search", error);
    }
  }, [from, to]);

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <div className="mx-auto relative w-full px-5 lg:w-2/3 lg:p-0">
        <div className="flex flex-col space-x-0 space-y-5 sm:flex-row sm:space-x-4 sm:space-y-0 mb-6 justify-center">
          <CityAutocomplete
            value={from}
            onChange={setFrom}
            placeholder="From (city)"
            country="US" // Limit to USA
          />
          <CityAutocomplete
            value={to}
            onChange={setTo}
            placeholder="To (city)"
            country="US" // Limit to USA
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="self-end w-full sm:w-auto"
          >
            {loading ? "Loading..." : "Search"}
          </Button>
        </div>
        <CustomMap directions={directions} />
        {carriers.length > 0 && <TopCarriers carriers={carriers} />}
        {error && <div className="error text-red-500 pt-5">{error}</div>}
      </div>
    </LoadScript>
  );
}
