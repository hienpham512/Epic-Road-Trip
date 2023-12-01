import React, { useEffect, useRef, useState } from "react";
import TextInput from "./TextInput";

interface AutoCompleteInputProps {
  label: string;
  placeholder: string;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  defaultValue?: string;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  label,
  placeholder,
  onPlaceSelected,
  defaultValue,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      setAutocomplete(autocomplete);

      // Set the component to null when the autocomplete is closed
      autocomplete.addListener("place_changed", () => {
        onPlaceSelected(autocomplete.getPlace());
        inputRef.current?.blur();
      });
    }
  }, [inputRef, onPlaceSelected]);

  return (
    <div className="mx-auto max-w-lg flex">
      <div className="relative w-full shadow-md rounded-md">
        <p className="-top-3 left-2 bg-white px-2 absolute text-gray-500">
          {label}
        </p>
        <input
          className="border border-gray-100 rounded-md p-2 w-full outline-red-600"
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};

export default AutoCompleteInput;
