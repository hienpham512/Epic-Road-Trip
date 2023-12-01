import React, { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";

interface Props {
  width: number;
  height: number;
}

const Map: React.FC<Props> = ({ width, height }) => {
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    margin: "0 auto",
  };

  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // San Francisco, CA
  const mapRef = useRef<google.maps.Map>();

  const autocomplete = useRef<google.maps.places.Autocomplete>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ["places"], // Passage de la liste des bibliothèques
  });

  const [markers, setMarkers] = useState<
    {
      id: number;
      lat: number;
      lng: number;
    }[]
  >([]);

  const addMarker = () => {
    const centerPosition = mapRef.current?.getCenter();
    if (centerPosition) {
      const newMarker = {
        id: markers.length + 1,
        lat: centerPosition.lat(),
        lng: centerPosition.lng(),
      };
      setMarkers([...markers, newMarker]);
    }
  };

  const onPlaceChanged = () => {
    if (autocomplete.current !== null) {
      const place = autocomplete.current!.getPlace();
      if (!place.geometry) return;
      const newCenter = {
        lat: place.geometry.location!.lat(),
        lng: place.geometry.location!.lng(),
      };
      mapRef.current?.panTo(newCenter);
      setCenter(newCenter);
      setMarkers([]);
    }
  };

  if (loadError) return <div>Loading Failed</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row items-center justify-center w-full mb-4 mt-4">
        <div className="flex items-center mr-4">
          <Autocomplete
            onLoad={(auto) => (autocomplete.current = auto)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter location"
              className="border border-gray-300 rounded py-2 px-4"
            />
          </Autocomplete>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
            onClick={() => addMarker()}>
              Add Marker
        </button>
        <button
          onClick={() => mapRef.current && setMarkers([])}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Clear markers
        </button>
      </div>
      <div className="w-full h-full">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              label={marker.id.toString()}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
