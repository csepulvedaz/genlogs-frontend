"use client";

import { useState, useCallback } from "react";
import { LoadScript } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";

import CustomMap from "./CustomMap";
import TopCarriers from "../TopCarriers";
import CityAutocomplete from "./CityAutocomplete";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function RouteSearch() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetValues = () => {
    setDirections(null);
    setLoading(false);
    setError(null);
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
        (result, status) => {
          setLoading(false);
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
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
      <div className="mx-auto relative w-2/3">
        <div className="flex space-x-4 mb-6 justify-center">
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
            className="self-end"
          >
            {loading ? "Loading..." : "Search"}
          </Button>
        </div>
        <CustomMap directions={directions} />
        <TopCarriers />
        {error && <div className="error text-red-500 pt-5">{error}</div>}
      </div>
    </LoadScript>
  );
}
