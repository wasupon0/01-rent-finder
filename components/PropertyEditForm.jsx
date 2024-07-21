"use client";

import { fetchProperty } from "@/utils/requests";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PropertyEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    type: "Apartment",
    name: "Test Property",
    description: "",
    location: {
      station: "",
      ward: "Test Ward",
      city: "Test City",
      floor: "",
    },
    age: "3",
    distance: "2",
    square_meter: "25",
    amenities: ["Free Parking"],
    cost: {
      monthly: "",
      fee: "2000",
      deposit: "",
    },
    seller_info: {
      name: "",
      email: "test@test.com",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Fetch property data for form
    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchProperty(id);

        // Check cost for null, if so then make empty string
        if (propertyData && propertyData.cost) {
          const defaultRates = { ...propertyData.cost };
          for (const rate in defaultRates) {
            if (defaultRates[rate] == null) {
              defaultRates[rate] = "";
            }
          }
          propertyData.cost = defaultRates;
        }

        setFields(propertyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //Check if nested property
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");

      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      // Not nested
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;

    // Clone the current array
    const updatedAmenities = [...fields.amenities];

    if (checked) {
      // Add value to array
      updatedAmenities.push(value);
    } else {
      // Remove value from array
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }
    // Update city with updated array
    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.status === 200) {
        router.push(`/properties/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    mounted &&
    !loading && (
      <form onSubmit={handleSubmit}>
        <h2 className="mb-6 text-3xl font-semibold text-center">
          Edit Property
        </h2>

        <div className="mb-4">
          <label htmlFor="type" className="block mb-2 font-bold text-gray-700">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            className="w-full px-3 py-2 border rounded"
            required
            value={fields.type}
            onChange={handleChange}
          >
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
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Listing Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 mb-2 border rounded"
            placeholder="eg. Beautiful Apartment In Miami"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 font-bold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border rounded"
            rows="4"
            placeholder="Add an optional description of your property"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="p-4 mb-4 bg-orange-50">
          <label className="block mb-2 font-bold text-gray-700">Location</label>
          <input
            type="text"
            id="station"
            name="location.station"
            className="w-full px-3 py-2 mb-2 border rounded"
            placeholder="Station"
            value={fields.location.station}
            onChange={handleChange}
          />
          <input
            type="text"
            id="ward"
            name="location.ward"
            className="w-full px-3 py-2 mb-2 border rounded"
            placeholder="Ward"
            required
            value={fields.location.ward}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="w-full px-3 py-2 mb-2 border rounded"
            placeholder="City"
            required
            value={fields.location.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="floor"
            name="location.floor"
            className="w-full px-3 py-2 mb-2 border rounded"
            placeholder="Floor"
            value={fields.location.floor}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-wrap mb-4">
          <div className="w-full pr-2 sm:w-1/3">
            <label htmlFor="age" className="block mb-2 font-bold text-gray-700">
              years
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full px-3 py-2 border rounded"
              required
              value={fields.age}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/3">
            <label
              htmlFor="distance"
              className="block mb-2 font-bold text-gray-700"
            >
              minutes
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              className="w-full px-3 py-2 border rounded"
              required
              value={fields.distance}
              onChange={handleChange}
            />
          </div>
          <div className="w-full pl-2 sm:w-1/3">
            <label
              htmlFor="square_meter"
              className="block mb-2 font-bold text-gray-700"
            >
              square meter
            </label>
            <input
              type="number"
              id="square_meter"
              name="square_meter"
              className="w-full px-3 py-2 border rounded"
              required
              value={fields.square_meter}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Amenities
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2"
                checked={fields.amenities.includes("Wifi")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Full Kitchen"
                className="mr-2"
                checked={fields.amenities.includes("Full Kitchen")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_kitchen">Full kitchen</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Washer & Dryer"
                className="mr-2"
                checked={fields.amenities.includes("Washer & Dryer")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Free Parking"
                className="mr-2"
                checked={fields.amenities.includes("Free Parking")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_free_parking">Free Parking</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Swimming Pool"
                className="mr-2"
                checked={fields.amenities.includes("Swimming Pool")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_pool">Swimming Pool</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Hot Tub"
                className="mr-2"
                checked={fields.amenities.includes("Hot Tub")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_hot_tub">Hot Tub</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="24/7 Security"
                className="mr-2"
                checked={fields.amenities.includes("24/7 Security")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_24_7_security">24/7 Security</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Wheelchair Accessible"
                className="mr-2"
                checked={fields.amenities.includes("Wheelchair Accessible")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wheelchair_accessible">
                Wheelchair Accessible
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Elevator Access"
                className="mr-2"
                checked={fields.amenities.includes("Elevator Access")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_elevator_access">Elevator Access</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Dishwasher"
                className="mr-2"
                checked={fields.amenities.includes("Dishwasher")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_dishwasher">Dishwasher</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Gym/Fitness Center"
                className="mr-2"
                checked={fields.amenities.includes("Gym/Fitness Center")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_gym_fitness_center">
                Gym/Fitness Center
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Air Conditioning"
                className="mr-2"
                checked={fields.amenities.includes("Air Conditioning")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Balcony/Patio"
                className="mr-2"
                checked={fields.amenities.includes("Balcony/Patio")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Smart TV"
                className="mr-2"
                checked={fields.amenities.includes("Smart TV")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_smart_tv">Smart TV</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Coffee Maker"
                className="mr-2"
                checked={fields.amenities.includes("Coffee Maker")}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
            </div>
          </div>
        </div>

        <div className="p-4 mb-4 bg-orange-50">
          <label className="block mb-2 font-bold text-gray-700">
            Cost (Leave blank if not applicable)
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="monthly_cost" className="mr-2">
                Monthly
              </label>
              <input
                type="number"
                id="monthly_cost"
                name="cost.monthly"
                className="w-full px-3 py-2 border rounded"
                value={fields.cost.monthly}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="fee_cost" className="mr-2">
                Fee
              </label>
              <input
                type="number"
                id="fee_cost"
                name="cost.fee"
                className="w-full px-3 py-2 border rounded"
                value={fields.cost.fee}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="deposit_cost" className="mr-2">
                Deposit
              </label>
              <input
                type="number"
                id="deposit_cost"
                name="cost.deposit"
                className="w-full px-3 py-2 border rounded"
                value={fields.cost.deposit}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block mb-2 font-bold text-gray-700"
          >
            Seller Name
          </label>
          <input
            type="text"
            id="seller_name"
            name="seller_info.name"
            className="w-full px-3 py-2 border rounded"
            placeholder="Name"
            value={fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block mb-2 font-bold text-gray-700"
          >
            Seller Email
          </label>
          <input
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Email address"
            required
            value={fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block mb-2 font-bold text-gray-700"
          >
            Seller Phone
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="w-full px-3 py-2 border rounded"
            placeholder="Phone"
            value={fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Property
          </button>
        </div>
      </form>
    )
  );
};

export default PropertyEditForm;
