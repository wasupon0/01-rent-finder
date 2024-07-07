import PropertyMap from "@/components/PropertyMap";
import React from "react";
import {
  FaBath,
  FaBed,
  FaCheck,
  FaMapMarker,
  FaRulerCombined,
  FaTimes,
} from "react-icons/fa";

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="p-6 text-center bg-white rounded-lg shadow-md md:text-left">
        <div className="mb-4 text-gray-500">{property.type}</div>
        <h1 className="mb-4 text-3xl font-bold">{property.name}</h1>
        <div className="flex justify-center mb-4 text-gray-500 align-middle md:justify-start">
          <FaMapMarker className="mr-2 text-lg text-orange-700 fa-solid fa-location-dot" />
          {property.location && (
            <p className="text-orange-700">
              {property.location.street}, {property.location.city},{" "}
              {property.location.state}
            </p>
          )}
        </div>

        <h3 className="p-2 my-6 text-lg font-bold text-white bg-gray-800 border rounded-xl">
          Rates & Options
        </h3>
        <div className="flex flex-col justify-around md:flex-row">
          <div className="flex items-center justify-center pb-4 mb-4 border-b border-gray-200 md:border-b-0 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Nightly</div>
            {property.rates && (
              <div className="text-2xl font-bold text-orange-500">
                {property.rates.nightly ? (
                  `$${property.rates.nightly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center pb-4 mb-4 border-b border-gray-200 md:border-b-0 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Weekly</div>
            {property.rates && (
              <div className="text-2xl font-bold text-orange-500">
                {" "}
                {property.rates.weekly ? (
                  `$${property.rates.weekly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center pb-4 mb-4 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Monthly</div>
            {property.rates && (
              <div className="text-2xl font-bold text-orange-500">
                {" "}
                {property.rates.monthly ? (
                  `$${property.rates.monthly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-6 text-lg font-bold">Description & Details</h3>
        <div className="flex justify-center gap-4 mb-4 text-xl text-orange-500 space-x-9">
          <p>
            <FaBed className="inline-block mr-2" /> {property.beds} {""}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {property.baths} {""}
            <span className="hidden sm:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />{" "}
            {property.square_feet} {""}
            <span className="hidden sm:inline">sqft</span>
          </p>
        </div>
        <p className="mb-4 text-center text-gray-500">{property.description}</p>
      </div>

      <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-6 text-lg font-bold">Amenities</h3>

        {property.amenities && (
          <ul className="grid grid-cols-1 space-y-2 list-none md:grid-cols-2 lg:grid-cols-3">
            {property.amenities.map((amenity, index) => (
              <li key={index}>
                <FaCheck className="inline-block mr-2 text-green-600 " />{" "}
                {amenity}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
        <PropertyMap property={property} />
      </div>
    </main>
  );
};

export default PropertyDetails;
