import { getDetails } from "@/api/getDetails";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import MapDirections from "@/components/MapDirections";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon as CheckIcon } from "@heroicons/react/24/solid";
import { IPlaceDetails, PlaceType } from "@hienpham512/roadtrip";
import { Icon } from "@iconify/react";
import React from "react";
import StarRatings from "react-star-ratings";

enum Tab {
  COMMENTS = "Comments",
  DIRECTION = "Direction",
}

const Details: React.FC = () => {
  const [data, setData] = React.useState<IPlaceDetails | null>(null);
  const [placeType, setPlaceType] = React.useState<PlaceType>(
    window.location.pathname.split("/")[3] as PlaceType
  );

  const [tabSelected, setTabSelected] = React.useState<Tab>(Tab.COMMENTS);

  React.useEffect(() => {
    const fetchData = async () => {
      const placeId = window.location.pathname.split("/")[4];
      const response = await getDetails({
        placeId,
        placeType,
      });
      setData(response);
    };
    fetchData();
  }, []);

  if (!data)
    return (
      <div>
        <div className="grid justify-center items-center h-4/5">
          <Icon
            icon="line-md:loading-twotone-loop"
            className="h-32 w-32 text-blue-500"
          />
        </div>
      </div>
    );

  const {
    name,
    formatted_address,
    formatted_phone_number,
    international_phone_number,
    website,
    opening_hours,
    photos,
    rating,
    user_ratings_total,
  } = data.result;
  return (
    <div className="tracking-tighter">
      <div className="hidden">
        <Header title={placeType} />
      </div>
      <Carousel>
        {photos?.map((photo) => (
          <img
            key={photo.photo_reference}
            className="shadow-sm object-cover w-full h-96"
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${
              photo.photo_reference
            }&sensor=false&height=${photo.height}&maxwidth=${photo.width}&key=${
              import.meta.env.VITE_GOOGLE_MAP_API_KEY
            }`}
          />
        ))}
      </Carousel>
      <div className="p-3 md:p-5">
        <div className="flex md:justify-between xl:justify-around flex-col md:flex-row gap-1">
          <div className="space-y-5">
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="block md:hidden">
              <div className="flex gap-2">
                <StarRatings
                  rating={rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
                <p className="text-lg font-medium">
                  {rating.toFixed(1)}{" "}
                  <span className="text-gray-400 md:text-sm">
                    ({user_ratings_total} reviews)
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="ic:baseline-local-phone" className="h-8 w-8" />
              <p className="font-medium">
                {international_phone_number
                  ? international_phone_number
                  : formatted_phone_number}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="ic:baseline-location-on" className="h-8 w-8" />
              <p className="font-medium">{formatted_address}</p>
            </div>
            {website && (
              <div className="flex items-center gap-2 text-blue-500 hover:opacity-70">
                <Icon icon="ic:baseline-link" className="h-8 w-8" />
                <a
                  className="font-medium"
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2">
              {opening_hours?.open_now ? (
                <>
                  <CheckIcon className="h-7 text-green-600" />
                  <p className="text-green-600 font-medium">Open now</p>
                </>
              ) : (
                <>
                  <XMarkIcon className="h-7 text-red-600" />
                  <p className="text-red-600 font-medium">Closed now</p>
                </>
              )}
            </div>
          </div>
          <div>
            <div className="hidden md:block pb-6">
              <div className="flex justify-center gap-2">
                <StarRatings
                  rating={rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
                <p className="text-lg font-medium">
                  {rating.toFixed(1)}{" "}
                  <span className="text-gray-400 md:text-sm">
                    ({user_ratings_total} reviews)
                  </span>
                </p>
              </div>
            </div>
            {opening_hours?.weekday_text && (
              <div className="border rounded-xl p-3 shadow-lg space-y-2">
                <div className="flex items-center gap-2 pb-2">
                  <Icon icon="tabler:clock-hour-2" className="h-8 w-8" />
                  <p>Opening hours</p>
                </div>
                {opening_hours?.weekday_text.map((text, index) => (
                  <p key={index} className="font-medium">
                    {text}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border-t-2 mt-4 gap-2 grid">
          <div className="flex justify-center gap-3 items-center m-3 ">
            <button
              className={`${
                tabSelected === Tab.COMMENTS
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } px-3 py-2 rounded-md shadow-md`}
              onClick={() => setTabSelected(Tab.COMMENTS)}
            >
              {Tab.COMMENTS}
            </button>
            <button
              className={`${
                tabSelected === Tab.DIRECTION
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } px-3 py-2 rounded-md shadow-md`}
              onClick={() => setTabSelected(Tab.DIRECTION)}
            >
              {Tab.DIRECTION}
            </button>
          </div>
          {tabSelected === Tab.COMMENTS && (
            <Comments comments={data.result.reviews} />
          )}
          {tabSelected === Tab.DIRECTION && (
            <MapDirections
              destinationProps={
                data.result as unknown as google.maps.places.PlaceResult
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface IComments {
  comments: IComment[];
}

interface IComment {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

const Comments: React.FC<IComments> = ({ comments }) => {
  return (
    <div className="grid gap-3">
      {comments.map((comment, index) => (
        <div className="grid gap-3 border-b-2 p-1" key={index}>
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full"
              src={comment.profile_photo_url}
            />
            <div className="flex flex-col">
              <p className="font-medium">{comment.author_name}</p>
              <p className="text-gray-400 text-sm">
                {comment.relative_time_description}
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <StarRatings
              rating={comment.rating}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />
            <TruncatedText text={comment.text} />
          </div>
        </div>
      ))}
    </div>
  );
};

interface ITruncatedTextProps {
  text: string;
}

const TruncatedText: React.FC<ITruncatedTextProps> = ({ text }) => {
  const [showFullText, setShowFullText] = React.useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText = text.slice(0, 150) + "...";
  const showMoreButton = !showFullText && text.length > 150;
  const showLessButton = showFullText && text.length > 150;

  return (
    <div className="">
      <p>{showFullText ? text : truncatedText}</p>
      {showMoreButton && (
        <button
          className="mt-2 text-blue-500 font-semibold"
          onClick={toggleText}
        >
          Show more
        </button>
      )}
      {showLessButton && (
        <button
          className="mt-2 text-blue-500 font-semibold"
          onClick={toggleText}
        >
          Show less
        </button>
      )}
    </div>
  );
};

export default Details;
