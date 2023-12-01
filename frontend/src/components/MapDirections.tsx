import React, { useEffect, useRef, useState } from "react";

import AutoCompleteInput from "./AutoCompleteInput";
import TravelModeSelector from "./TravelModeSelector";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface IMapDirectionsProps {
  originProps?: google.maps.places.PlaceResult | null;
  destinationProps?: google.maps.places.PlaceResult | null;
}

const MapDirections: React.FC<IMapDirectionsProps> = ({
  originProps = null,
  destinationProps = null,
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<google.maps.places.PlaceResult | null>(
    originProps
  );
  const [destination, setDestination] =
    useState<google.maps.places.PlaceResult | null>(destinationProps);
  const [travelMode, setTravelMode] = useState<
    "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT"
  >("DRIVING");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!origin || !destination) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const request: google.maps.DirectionsRequest = {
      origin: origin.formatted_address ? origin.formatted_address : "",
      destination: destination.formatted_address
        ? destination.formatted_address
        : "",
      travelMode: travelMode as any,
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        setDirections(result);
        setError(null);
      } else {
        setDirections(null);
        setError("Could not find directions.");
        console.error(`Error fetching directions: ${status}`);
      }
    });
  }, [origin, destination, travelMode]);

  useEffect(() => {
    if (directions && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        gestureHandling: "greedy",
      });
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map,
        directions,
      });

      // Show detailed route on map
      const route = directions.routes[0];
      const legs = route.legs;
      for (let i = 0; i < legs.length; i++) {
        const steps = legs[i].steps;
        for (let j = 0; j < steps.length; j++) {
          const polyline = steps[j].polyline;
          const path = google.maps.geometry.encoding.decodePath(
            polyline!.points
          );
          const detailedRoute = new window.google.maps.Polyline({
            path,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          detailedRoute.setMap(map);
        }
      }
    }
  }, [directions, mapRef]);

  return (
    <div className="pb-16 space-y-4">
      <div className="space-y-8">
        <AutoCompleteInput
          label="Origin"
          placeholder="Enter origin"
          onPlaceSelected={setOrigin}
          defaultValue={
            origin && origin.formatted_address ? origin.formatted_address : ""
          }
        />
        <AutoCompleteInput
          label="Destination"
          placeholder="Enter destination"
          onPlaceSelected={setDestination}
          defaultValue={
            destination && destination.formatted_address
              ? destination.formatted_address
              : ""
          }
        />
        <TravelModeSelector
          value={travelMode}
          onChange={(event) => setTravelMode(event.target.value as any)}
        />
      </div>
      {error ? (
        <div className="text-center p-4 italic text-red-500">
          No route found. Please try again with different origin. Eg: airport,
          train station,...
        </div>
      ) : (
        directions && (
          <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
        )
      )}
      <div>
        <ol>
          {directions && (
            <div className="mt-4">
              <div>
                <p>
                  Distance:{" "}
                  {directions.routes[0].legs[0].distance
                    ? directions.routes[0].legs[0].distance.text
                    : "No infomation"}
                </p>
                <p>
                  Duration:{" "}
                  {directions.routes[0].legs[0].duration
                    ? directions.routes[0].legs[0].duration.text
                    : "No infomation"}
                </p>
              </div>
              <h2 className="text-lg font-medium">Directions</h2>
              <ol className="list-decimal pl-4 mt-2">
                {directions.routes[0].legs[0].steps.map((step) => (
                  <li
                    key={step.instructions}
                    dangerouslySetInnerHTML={{ __html: step.instructions }}
                    className="my-2"
                  />
                ))}
              </ol>
            </div>
          )}
        </ol>
      </div>
    </div>
  );
};

export default MapDirections;
