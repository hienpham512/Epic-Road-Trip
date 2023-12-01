import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import { useData } from "@/contexts/dataContext";
import React, { useState } from "react";

const Events: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { events, fetchNextPage } = useData();
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  React.useEffect(() => {
    const handleScroll = () =>
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      (() => {
        setPage(page + 1);
        fetchNextPage(events?.events, "events", "", page + 1);
      })();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [events]);

  React.useEffect(() => {
    if (!events?.events) return;
    const allClassifications = events?.events
      ?.map((event) => {
        return event?.classifications?.map((classification) => {
          return classification.segment.name;
        });
      })
      .flat();
    setFilters(
      allClassifications.filter((item, index) => {
        return allClassifications.indexOf(item) === index;
      }) as string[]
    );
  }, [events]);

  return (
    <div className="flex flex-col items-center justify-center tracking-tighter">
      <Header
        title="Events"
        filters={
          filters.length > 0 && (
            <Filters
              filters={filters}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          )
        }
      />
      {events?.events?.length > 0 && (
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-6 xl:grid-cols-3 px-2 lg:px-5 bg-gray-100 py-8 w-full">
          {(() => {
            if (selectedFilter !== "")
              return events?.events?.filter(({ classifications }) => {
                return classifications
                  ?.map((classification) => classification.segment.name)
                  .includes(selectedFilter);
              });
            else return events?.events;
          })().map((event, index) => {
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
      )}
    </div>
  );
};

export default Events;

const Filters: React.FC<{
  filters: string[];
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}> = ({ filters, selectedFilter, setSelectedFilter }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {filters.length > 0 &&
        filters.map((filter, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-md transition-all ease-in-out hover:scale-105 ${
              selectedFilter === filter ? "bg-blue-900 text-white" : "bg-white"
            }`}
            onClick={() =>
              filter === selectedFilter
                ? setSelectedFilter("")
                : setSelectedFilter(filter)
            }
          >
            {filter}
          </button>
        ))}
    </div>
  );
};
