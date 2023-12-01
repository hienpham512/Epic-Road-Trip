import logo from "@logos/logo.png";
import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "@hooks/useAuth";
import googleLogo from "@logos/google.svg";
interface IAuthLayoutProps {}

const AuthLayout: React.FC<IAuthLayoutProps> = ({}) => {
  //check current path
  const isSignIn = !!(window.location.pathname === "/auth/signin");
  const isSignUp = !!(window.location.pathname === "/auth/signup");

  //States for the data
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");

  //authenticate function
  const authenticate = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    //check if the route is signin
    if (isSignIn)
      //signin
      signin(email, password);
    else if (isSignUp)
      //signup
      signup(firstName, lastName, email, password, confirmPassword);
  };
  const { signin, signup, signinWithGoogle } = useAuth();
  return (
    <div className="font-poppins tracking-wider scrollbar-hide">
      <Navbar />
      <div className="flex items-start justify-center h-screen w-screen md:bg-gray-100">
        <form
          className="flex flex-col gap-5 justify-center items-center md:border w-full md:w-[550px] p-6 md:mt-16 md:rounded-xl md:shadow-xl bg-white"
          onSubmit={authenticate}
        >
          <img src={logo} className="h-52" />
          <h1 className="text-center text-black text-4xl">
            {(() => {
              if (isSignIn) return "Signin";
              else if (isSignUp) return "Signup";
            })()}
          </h1>
          <p className="text-gray-400 text-center">
            {(() => {
              if (isSignIn) return "Don't have an account?";
              else if (isSignUp) return "Already have an account?";
            })()}{" "}
            <a
              href={(() => {
                if (isSignIn) return "/auth/signup";
                else if (isSignUp) return "/auth/signin";
              })()}
              className="text-red-500 hover:underline"
            >
              {(() => {
                if (isSignIn) return "Signup";
                else if (isSignUp) return "Signin";
              })()}
            </a>
          </p>
          <Outlet
            context={{
              email,
              setEmail,
              password,
              setPassword,
              confirmPassword,
              setConfirmPassword,
              firstName,
              setFirstName,
              lastName,
              setLastName,
            }}
          />
          {/* Change button to global component */}
          <button className="border w-full p-2 rounded-md border-gray-200 shadow-md text-white bg-red-600 lg:button-y font-medium">
            {(() => {
              if (isSignIn) return "Signin";
              else if (isSignUp) return "Signup";
            })()}
          </button>
          <button
            onClick={() => signinWithGoogle()}
            className="flex items-center justify-center gap-3 bg-blue-600 text-white p-2 w-full shadow-md rounded-md lg:button-y font-medium"
          >
            <img src={googleLogo} className="h-6 bg-white rounded-full" />
            {(() => {
              if (isSignIn) return "Signin";
              else if (isSignUp) return "Signup";
            })()}{" "}
            with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;

export function useUserData() {
  return useOutletContext<{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
  }>();
}
