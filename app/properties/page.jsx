import Properties from "@/components/Properties";
import PropertySearchForm from "@/components/PropertySearchForm";
import Link from "next/link";
import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const PropertiesPage = async () => {
  return (
    <>
      <section className="py-4 bg-orange-400">
        <div className="flex flex-col items-start px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>{" "}
      <Properties />
    </>
  );
};

export default PropertiesPage;
