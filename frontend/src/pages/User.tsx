import EventCard from "@/components/EventCard";
import InfoCard from "@/components/InfoCard";
import { useUser } from "@/contexts/authContext";
import { db } from "@/firebase";
import {
  IAccomodationResult,
  IAttractionResult,
  IBarResult,
  INightClubResult,
  IRestaurantResult,
} from "@hienpham512/roadtrip";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { PAGE_SELECTED } from "./Chill";

const User: React.FC = () => {
  const user = useUser();
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user?.uid || ""))
      .then((doc) => {
        if (doc.exists()) setUserData(doc.data());
        else console.log("No such document!");
      })
      .catch((error) => console.log("Error getting document:", error));
  }, [user]);

  return (
    <div className="p-5 space-y-4">
      <p className="text-2xl">
        Welcome
        <span className="font-bold"> {user?.displayName},</span>
      </p>
      <p className="font-medium">Previous transactions</p>
      {userData && (
        <>
          <DisplayPackage
            dataArray={userData?.accomodations}
            selectedPage={PAGE_SELECTED.ACCOMODATIONS}
            title="Accomodations"
          />
          <DisplayPackage
            dataArray={userData?.attractions}
            selectedPage={PAGE_SELECTED.ATTRACTIONS}
            title="Attractions"
          />
          <DisplayPackage
            dataArray={userData?.restaurants}
            selectedPage={PAGE_SELECTED.RESTAURANTS}
            title="Restaurants"
          />
          <DisplayPackage
            dataArray={userData?.bars}
            selectedPage={PAGE_SELECTED.BARS}
            title="Bars"
          />
          <DisplayPackage
            dataArray={userData?.nightclubs}
            selectedPage={PAGE_SELECTED.NIGHTCLUBS}
            title="Nightclubs"
          />
          <div className="mb-8 space-y-0">
            <p className="text-3xl md:p-5 font-bold text-center lg:text-start">
              Events
            </p>
            <div className="overflow-x-scroll flex gap-6 scrollbar-hide p-5">
              {userData.events?.map((event: any, index: any) => {
                const {
                  name,
                  url,
                  _embedded,
                  images,
                  description,
                  dates,
                  priceRanges,
                } = event;
                return (
                  <EventCard
                    key={index}
                    url={url}
                    images={images}
                    name={name}
                    description={description}
                    priceRanges={priceRanges}
                    _embedded={_embedded}
                    dates={dates}
                    event={event}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;

const DisplayPackage: React.FC<{
  title: string;
  dataArray:
    | IAttractionResult[]
    | IAccomodationResult[]
    | IRestaurantResult[]
    | IBarResult[]
    | INightClubResult[];
  selectedPage: PAGE_SELECTED;
}> = ({ title, dataArray, selectedPage }) => {
  return (
    <div className="mb-8 space-y-0">
      <p className="text-3xl p-5 font-bold text-center lg:text-start">
        {title}
      </p>
      <div className="overflow-x-scroll flex gap-6 scrollbar-hide md:p-5">
        {dataArray?.map((data, index) => {
          const {
            name,
            photos,
            rating,
            user_ratings_total,
            vicinity,
            opening_hours,
          } = data;
          return (
            <InfoCard
              key={index}
              name={name}
              photo={photos[0].photo_reference}
              rating={rating}
              user_ratings_total={user_ratings_total}
              vicinity={vicinity}
              open_now={opening_hours?.open_now}
              place={data}
              pageSelected={selectedPage}
            />
          );
        })}
      </div>
    </div>
  );
};
