"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import CustomSlider from "./CustomSlider";

const PropertySearchForm = () => {
  const params = useSearchParams();

  const [location, setLocation] = useState("");
  const [station, setStation] = useState(params.get("location") || "All");
  const [propertyType, setPropertyType] = useState(
    params.get("propertyType") || "All",
  );

  const [selectedRange, setSelectedRange] = useState([
    parseInt(params.get("priceMin")) || 0,
    parseInt(params.get("priceMax")) || 300000,
  ]);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, propertyType, selectedRange });

    if (
      location === "" &&
      station === "All" &&
      propertyType === "All" &&
      selectedRange[0] === 0 &&
      selectedRange[1] === 300000
    ) {
      router.push("/properties");
    } else {
      const query = `?location=${location || station}&propertyType=${propertyType}&priceMin=${selectedRange[0]}&priceMax=${selectedRange[1]}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-2xl mx-auto mt-3 md:flex-row"
    >
      <div className="md:flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="w-full mb-4 md:w-3/5 md:pr-2 md:mb-0">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <span className="invisible">{"span"}</span>

            <input
              type="text"
              id="location"
              placeholder="Enter Keywords or Location"
              className="w-full px-4 py-2.5 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring focus:ring-orange-600"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setStation("");
              }}
            />
          </div>
          <div className="w-full md:w-2/5 md:pl-2">
            <label htmlFor="property-type" className="sr-only">
              Property Type
            </label>
            <span className="font-semibold text-white">Room Type</span>
            <select
              id="property-type"
              className="w-full px-4 py-3 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring focus:ring-orange-600"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="1R">1R</option>
              <option value="1K">1K</option>
              <option value="1DK">1DK</option>
              <option value="1LDK">1LDK</option>
              <option value="2K">2K</option>
              <option value="2DK">2DK</option>
              <option value="2LDK">2LDK</option>
              <option value="3K">3K</option>
            </select>
          </div>

          <div className="w-full mt-2 md:w-2/5 md:pl-2 md:m-0">
            <label htmlFor="property-station" className="sr-only">
              Property Station
            </label>
            <span className="font-semibold text-white">Train Station</span>
            <select
              id="property-station"
              className="w-full px-4 py-3 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring focus:ring-orange-600"
              value={station}
              onChange={(e) => {
                setStation(e.target.value);
                setLocation("");
              }}
            >
              <option value="All">All</option>
              <option value="Shinjuku">Shinjuku</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Shibuya">Shibuya</option>
              <option value="Ikebukuro">Ikebukuro</option>
              <option value="Shinagawa">Shinagawa</option>
              <option value="Ueno">Ueno</option>
              <option value="Akihabara">Akihabara</option>
              <option value="Ginza">Ginza</option>
              <option value="Asakusa">Asakusa</option>
              <option value="Roppongi">Roppongi</option>
            </select>
          </div>

          <div className="md:hidden">
            <br />
            <CustomSlider
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />
          </div>

          <div>
            <span className="invisible">{"span"}</span>

            <button
              type="submit"
              className="w-full px-6 py-2 mt-4 font-bold text-orange-600 bg-white border-2 border-orange-600 rounded-lg md:ml-4 md:mt-0 md:w-auto hover:bg-orange-600 hover:text-white focus:outline-none focus:ring focus:ring-orange-500"
            >
              Search
            </button>
          </div>
        </div>

        <div className="hidden md:block">
          <br />
          <CustomSlider
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
      </div>
    </form>
  );
};
export default PropertySearchForm;
