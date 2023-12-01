import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import { useData } from "@/contexts/dataContext";
import { CheckBadgeIcon as CheckIconLight } from "@heroicons/react/24/outline";
import {
  CheckBadgeIcon as CheckIcon,
  StarIcon as DarkStarIcon,
  ArrowLongDownIcon as DownIcon,
  ArrowLongUpIcon as UpIcon,
} from "@heroicons/react/24/solid";
import { IAccomodationResult } from "@hienpham512/roadtrip";
import React from "react";
import { PAGE_SELECTED } from "./Chill";

const Accomodations: React.FC = ({}) => {
  const { accomodations, fetchNextPage } = useData();

  React.useEffect(() => {
    if (selectedFilter !== "") return;
    const handleScroll = () =>
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      fetchNextPage(
        accomodations?.results,
        "accomodations",
        accomodations?.next_page_token
      );
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [accomodations]);

  const [selectedFilter, setSelectedFilter] = React.useState<string>("");
  const [ratingSortAsc, setRatingSortAsc] = React.useState<boolean>(false);
  const [openPlaceFilter, setOpenPlaceFilter] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center tracking-tighter">
      <Header
        title="Accomodations"
        filters={
          <Filters
            accomodations={accomodations.results}
            setSelectedFilter={(filter: string) => setSelectedFilter(filter)}
            selectedFilter={selectedFilter}
            ratingSortAsc={ratingSortAsc}
            setRatingSortAsc={(asc: boolean) => setRatingSortAsc(asc)}
            openPlaceFilter={openPlaceFilter}
            setOpenPlaceFilter={(open: boolean) => setOpenPlaceFilter(open)}
          />
        }
      />
      {accomodations?.results?.length > 0 && (
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-6 xl:grid-cols-3 px-2 lg:px-5 bg-gray-100 py-8 w-full">
          {(() => {
            if (selectedFilter)
              return accomodations?.results?.filter(({ types }) =>
                types.includes(selectedFilter)
              );
            else return accomodations?.results;
          })()
            .sort((a, b) =>
              (() => {
                if (ratingSortAsc) return a.rating - b.rating;
                return b.rating - a.rating;
              })()
            )
            .filter(
              (accomodation) =>
                !openPlaceFilter || accomodation.opening_hours?.open_now
            )
            .map((accomodation, index) => {
              const {
                name,
                photos,
                rating,
                user_ratings_total,
                vicinity,
                opening_hours,
              } = accomodation;
              return (
                <InfoCard
                  key={index}
                  place={accomodation}
                  name={name}
                  photo={photos[0].photo_reference}
                  rating={rating}
                  user_ratings_total={user_ratings_total}
                  vicinity={vicinity}
                  open_now={opening_hours?.open_now}
                  pageSelected={PAGE_SELECTED.ACCOMODATIONS}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Accomodations;

const Filters: React.FC<{
  accomodations: IAccomodationResult[];
  setSelectedFilter: (filter: string) => void;
  selectedFilter: string;
  ratingSortAsc: boolean;
  setRatingSortAsc: (asc: boolean) => void;
  openPlaceFilter: boolean;
  setOpenPlaceFilter: (open: boolean) => void;
}> = ({
  accomodations,
  selectedFilter,
  setSelectedFilter,
  ratingSortAsc,
  setRatingSortAsc,
  openPlaceFilter,
  setOpenPlaceFilter,
}) => {
  const [filters, setFilters] = React.useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  React.useEffect(() => {
    if (accomodations?.length === 0 || !accomodations) return;
    setFilters(
      accomodations?.reduce((acc, { types }) => {
        types.forEach((type) => {
          const index = acc.findIndex(({ label }) => label === type);
          if (index === -1) {
            acc.push({ label: type, value: 1 });
          } else {
            acc[index].value += 1;
          }
        });
        return acc;
      }, [] as { label: string; value: number }[])
    );
  }, [accomodations]);

  return (
    <>
      {accomodations?.length > 0 && (
        <div className="lg:flex lg:items-center gap-2 md:gap-4 lg:flex-col grid grid-cols-2">
          <select
            className="bg-white rounded-lg font-light italic px-3 py-1 text-sm lg:hidden"
            onChange={(e) => setSelectedFilter(e.target.value)}
            defaultValue=""
          >
            <option value="">All</option>
            {filters?.map(({ label, value }, index) => (
              <option value={label} key={index}>
                {label.charAt(0).toUpperCase() +
                  label.slice(1).replace(/_/g, " ")}{" "}
                ({value})
              </option>
            ))}
          </select>
          <div className="lg:flex flex-wrap gap-4 hidden justify-center">
            {filters?.map(({ label, value }, index) => (
              <div className="flex gap-2" key={index}>
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-md transition-all ease-in-out hover:scale-105 ${
                    selectedFilter === label
                      ? "bg-blue-900 text-white"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    label === selectedFilter
                      ? setSelectedFilter("")
                      : setSelectedFilter(label)
                  }
                >
                  <p className="text-sm">
                    {label.charAt(0).toUpperCase() +
                      label.slice(1).replace(/_/g, " ")}{" "}
                    ({value})
                  </p>
                </button>
                {index !== filters.length - 1 && (
                  <div className="w-0.5 h-10 bg-white" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="w-0.5 h-7 bg-white lg:hidden" />
            <button
              className="flex items-center"
              onClick={() => setRatingSortAsc(!ratingSortAsc)}
            >
              <DarkStarIcon className="h-6 text-yellow-500" />
              {ratingSortAsc ? (
                <DownIcon className="h-5 text-white" />
              ) : (
                <UpIcon className="h-5 text-white" />
              )}
            </button>
            <div className="w-0.5 h-7 bg-white" />
            {/* <div className="flex items-center">
              <EuroIcon className="h-6 text-white" />
              <UpIcon className="h-5 text-white" />
            </div> */}
            <div
              className="flex items-center text-white gap-1"
              role="button"
              onClick={() => setOpenPlaceFilter(!openPlaceFilter)}
            >
              {openPlaceFilter ? (
                <CheckIcon className="h-6" />
              ) : (
                <CheckIconLight className="h-6" />
              )}
              <p className="">Open</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
