"use client";

import PropertyAddForm from "@/components/PropertyAddForm";

const PropertyAddPage = () => {
  return (
    <section className="bg-orange-50">
      <div className="container max-w-2xl py-24 m-auto">
        <div className="px-6 py-8 m-4 mb-4 bg-white border rounded-md shadow-md md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default PropertyAddPage;
