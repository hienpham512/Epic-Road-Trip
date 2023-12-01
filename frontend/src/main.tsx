import "./index.css";

import { AuthProvider } from "./contexts/authContext";
import CartProvider from "./contexts/cartContext";
import DataProvider from "./contexts/dataContext";
import LocationProvider from "./contexts/locationContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <LocationProvider>
        <CartProvider>
          <AuthProvider>
            <DataProvider>
              <RouterProvider router={router} />
            </DataProvider>
          </AuthProvider>
        </CartProvider>
      </LocationProvider>
    </Elements>
  </React.StrictMode>
);
