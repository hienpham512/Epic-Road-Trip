import React from "react";

interface TravelModeSelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TravelModeSelector: React.FC<TravelModeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="mx-auto max-w-lg space-x-4">
      <label>Travel mode:</label>
      <select value={value} onChange={onChange} className="border rounded-lg focus:outline-none">
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
    </div>
  );
};

export default TravelModeSelector;
