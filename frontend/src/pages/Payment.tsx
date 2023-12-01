import TextInput from "@/components/TextInput";
import { useUser } from "@/contexts/authContext";
import { useCart } from "@/contexts/cartContext";
import { db } from "@/firebase";
import {
  IAccomodationResult,
  IAttractionResult,
  IBarResult,
  IEventItems,
  INightClubResult,
  IPackage,
  IRestaurantResult,
} from "@hienpham512/roadtrip";
import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  View
} from "@react-pdf/renderer";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import React from "react";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paid, setPaid] = React.useState<boolean>(false);
  const {
    accomodations,
    events,
    attractions,
    restaurants,
    bars,
    nightclubs,
    packages,
  } = useCart();

  const totalItems = React.useMemo(() => {
    return (
      accomodations.length +
      events.length +
      attractions.length +
      restaurants.length +
      bars.length +
      nightclubs.length +
      packages.length
    );
  }, [
    events,
    attractions,
    restaurants,
    bars,
    nightclubs,
    packages,
    accomodations,
  ]);
  const user = useUser();
  //update user to add items to firebase firestore
  const updateUserData = () => {
    setDoc(
      doc(db, "users", user?.uid || ""),
      {
        firstName: "Bishesh",
        lastName: "Tilara",
        email: "bisheshtilara@gmail.com",
        accomodations: arrayUnion(...accomodations),
        events: arrayUnion(...events),
        attractions: arrayUnion(...attractions),
        restaurants: arrayUnion(...restaurants),
        bars: arrayUnion(...bars),
        nightclubs: arrayUnion(...nightclubs),
      },
      { merge: true }
    )
      .then(() => console.log("updated user data"))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const target = event.target as any;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: target.name.value,
        email: target.email.value,
        address: {
          line1: target.address.value,
          postal_code: target.zip.value,
          city: target.city.value,
          // country: event.target.country.value,
        },
      },
    } as any);

    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
      setPaid(true);
      updateUserData();
    }
  };

  if (!paid)
    return (
      <div className="p-12 space-y-12">
        <p className="font-semibold text-3xl text-center">Confirm Order</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:px-24">
            <TextInput type="text" label="Name" name="name" />
            <TextInput type="email" label="Email" name="email" />
            <TextInput type="text" label="Address" name="address" />
            <TextInput type="text" label="Zip" name="zip" />
            <TextInput type="text" label="City" name="city" />
            <TextInput type="text" label="Country" />
          </div>
          <div className="lg:mx-96 border-t p-4 rounded-lg shadow-md">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "16px",
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg lg:mx-auto lg:px-48 button-x font-semibold"
          >
            Pay {totalItems * 67}€
          </button>
        </form>
      </div>
    );
  else
    return (
      <div className="p-12 space-y-4">
        <p className="text-3xl font-semibold text-center">Payment Successful</p>
        <div className="flex flex-col items-center gap-4">
          <p>Thank you for choosing us as your trip planner!</p>
          <p>Your order is confirmed</p>
          <div className="border text-white bg-blue-500 p-3 rounded-lg button-x">
            <PDFDownloadLink
              document={
                <MyDoc
                  accomodations={accomodations}
                  attractions={attractions}
                  bars={bars}
                  events={events}
                  nightclubs={nightclubs}
                  packages={packages}
                  restaurants={restaurants}
                />
              }
              fileName="somename.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download your receipt!"
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    );
};
export default Payment;

const MyDoc: React.FC<{
  accomodations: IAccomodationResult[];
  events: IEventItems[];
  attractions: IAttractionResult[];
  restaurants: IRestaurantResult[];
  bars: IBarResult[];
  nightclubs: INightClubResult[];
  packages: IPackage[];
}> = ({
  accomodations,
  events,
  attractions,
  restaurants,
  bars,
  nightclubs,
  packages,
}) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#E4E4E4",
        }}
      >
        <RenderPDFData title="Accomodations" dataArray={accomodations} />
        <RenderPDFData title="Events" dataArray={events} />
        <RenderPDFData title="Attractions" dataArray={attractions} />
        <RenderPDFData title="Restaurants" dataArray={restaurants} />
        <RenderPDFData title="Bars" dataArray={bars} />
        <RenderPDFData title="Nightclubs" dataArray={nightclubs} />
        <RenderPDFData title="Packages" dataArray={packages} />
      </Page>
    </Document>
  );
};

const RenderPDFData: React.FC<{
  title: string;
  dataArray:
    | IAccomodationResult[]
    | IEventItems[]
    | IAttractionResult[]
    | IRestaurantResult[]
    | IBarResult[]
    | INightClubResult[]
    | IPackage[];
}> = ({ title, dataArray }) => {
  return (
    <>
      {dataArray.length > 0 && (
        <View
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <Text>{title}</Text>
          {dataArray.map((data, index) => (
            <View
              key={index}
              style={{
                margin: 10,
                padding: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  margin: 10,
                  padding: 10,
                  display: "flex",
                }}
              >
                <Text>{(data as any).name}</Text>
                {title !== ("Events" || "Attractions" || "Packages") && (
                  <Text>{(data as any).vicinity}</Text>
                )}
              </View>
              <Text>67€</Text>
            </View>
          ))}
        </View>
      )}
    </>
  );
};
