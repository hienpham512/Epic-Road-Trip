import React from "react";
import { InputHTMLAttributes } from "react";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput: React.FC<ITextInputProps> = ({ label, ...rest }) => {
  return (
      <div className="relative w-full shadow-md rounded-md">
      <p className="-top-3 left-2 bg-white px-2 absolute text-gray-500">{label}</p>
      <input {...rest} className="border border-gray-100 rounded-md p-2 w-full outline-red-600"/>
    </div>
  );
};

export default TextInput;