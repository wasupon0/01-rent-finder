"use client";

import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Spinner from "@/components/Spinner";
import { createKey } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`,
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <>
      <section className="py-4 bg-blue-700">
        <div className="flex flex-col items-start px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="px-4 py-6 m-auto container-xl lg:container">
            <Link
              href="/properties"
              className="flex items-center mb-3 text-orange-500 hover:underline"
            >
              <FaArrowAltCircleLeft className="mb-1 mr-2" />
              Back To Properties
            </Link>
            <h1 className="mb-4 text-2xl">Search Results</h1>
            {properties.length === 0 ? (
              <p>No search results found</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
