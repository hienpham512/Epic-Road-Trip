import React from "react";
import TextInput from "../components/TextInput";
import { useUserData } from "../layouts/AuthLayout";

interface ISigninProps {}

const Signin: React.FC<ISigninProps> = ({}) => {
  const { email, setEmail, password, setPassword } = useUserData();
  return (
    <>
      <TextInput
        type="email"
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextInput
        type="password"
        label="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </>
  );
};

export default Signin;
