import { fetchProperties } from "@/utils/requests";

import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties = async () => {
  const properties = await fetchProperties({
    showFeatured: true,
  });

  return (
    properties.length > 0 && (
      <section className="px-4 pt-6 pb-10 bg-orange-50">
        <div className="m-auto container-xl lg:container">
          <h2 className="mb-6 text-3xl font-bold text-center text-orange-500">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {properties.map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};
export default FeaturedProperties;
