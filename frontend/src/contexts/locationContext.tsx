import { ILocation } from "@hienpham512/roadtrip";
import React from "react";

type ILocationContext = {
  location: ILocation;
  setLocation: (location: ILocation) => void;
  locationName: string;
  setLocationName: (locationName: string) => void;
};

const LocationContext = React.createContext<ILocationContext>(
  {} as ILocationContext
);

const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = React.useState<ILocation>({} as ILocation);
  const [locationName, setLocationName] = React.useState<string>("");

  return (
    <LocationContext.Provider
      value={{ location, setLocation, locationName, setLocationName }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => React.useContext(LocationContext);

export default LocationProvider;
