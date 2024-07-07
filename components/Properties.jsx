"use client";

import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import Pagination from "./Pagination";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await res.json();

        setProperties(data.properties);
        setTotalItems(data.total);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner />
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
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
export default Properties;
