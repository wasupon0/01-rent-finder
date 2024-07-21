import PropertyMap from "@/components/PropertyMap";
import React from "react";
import {
  FaCheck,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaRulerCombined,
  FaWalking,
} from "react-icons/fa";

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="p-6 text-center bg-white rounded-lg shadow-md md:text-left">
        <div className="mb-4 text-lg font-bold text-gray-500">
          {property.type}
        </div>
        <h1 className="mb-4 text-3xl font-bold">{property.name}</h1>
        <div className="flex justify-center mb-4 text-gray-500 align-middle md:justify-start">
          <FaMapMarkerAlt className="mr-2 text-lg text-orange-700 fa-solid fa-location-dot" />
          {property.location && (
            <p className="text-orange-700">
              {property.location.station}, {property.location.ward},{" "}
              {property.location.city}
            </p>
          )}
        </div>

        <h3 className="p-2 my-6 text-lg font-bold text-white bg-gray-800 border rounded-xl">
          Costs
        </h3>
        <div className="flex flex-col justify-around md:flex-row">
          <div className="flex items-center justify-center pb-4 mb-4 border-b border-gray-200 md:border-b-0 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Monthly</div>
            {property.cost && (
              <div className="text-2xl font-bold text-orange-500">
                {property.cost.monthly ? (
                  `¥${property.cost.monthly.toLocaleString()}`
                ) : (
                  <FaMoneyBill className="text-red-700" />
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center pb-4 mb-4 border-b border-gray-200 md:border-b-0 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Fee</div>
            {property.cost && (
              <div className="text-2xl font-bold text-orange-500">
                {" "}
                {property.cost.fee
                  ? `¥${property.cost.fee.toLocaleString()}`
                  : "No fee"}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center pb-4 mb-4 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Deposit</div>
            {property.cost && (
              <div className="text-2xl font-bold text-orange-500">
                {" "}
                {property.cost.deposit
                  ? `¥${property.cost.deposit.toLocaleString()}`
                  : "No deposit"}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-6 text-lg font-bold">Description & Details</h3>
        <div className="flex justify-center gap-4 mb-4 text-xl text-orange-500 space-x-9">
          <p>
            <FaClock className="inline-block mr-2" /> {property.age} {""}
            <span className="hidden sm:inline">years</span>
          </p>
          <p>
            <FaWalking className="inline-block mr-2" /> {property.distance} {""}
            <span className="hidden sm:inline">minutes</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />{" "}
            {property.square_meter} {""}
            <span className="hidden sm:inline">square meter</span>
          </p>
        </div>
        <p className="mb-4 text-center text-gray-500">{property.description}</p>
      </div>

      <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-6 text-lg font-bold">Amenities</h3>

        {property.amenities && (
          <ul className="grid grid-cols-1 list-none md:grid-cols-2 lg:grid-cols-3">
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
