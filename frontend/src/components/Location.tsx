//@ts-nocheck
import { FlagIcon, MapPinIcon } from "@heroicons/react/24/outline";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { ILocation } from "@hienpham512/roadtrip";
import { useLocation } from "@/contexts/locationContext";

const Location: React.FC<{
  setLocation: (location: ILocation) => void;
  start?: boolean;
  end?: boolean;
  width?: string;
}> = ({ setLocation, start = false, end = false, width }) => {
  const { locationName, setLocationName } = useLocation();
  return (
    <div
      className={`flex items-center border px-4 gap-1 rounded-md bg-white ${
        width ? width : "w-full lg:w-64 xl:w-72"
      }`}
    >
      <ReactGoogleAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
        onPlaceSelected={(place, inputRef) => {
          end && setLocationName(inputRef.value);
          setLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }}
        defaultValue={end ? locationName : ""}
        placeholder={(() => {
          if (start) return "Origin";
          else if (end) return "Destination";
        })()}
        options={{ fields: ["geometry"] }}
        className="p-2 w-full outline-none truncate"
      />
      {(() => {
        if (start) return <FlagIcon className="h-6 text-blue-600" />;
        else if (end) return <MapPinIcon className="h-6 text-blue-600" />;
      })()}
    </div>
  );
};

export default Location;
