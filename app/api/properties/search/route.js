import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();

    // `/api/properties/search?location=${location}&propertyType=${propertyType}&priceMin=${priceMin}&priceMax=${priceMax}`

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const priceMin = parseInt(searchParams.get("priceMin")) || 0;
    const priceMax = parseInt(searchParams.get("priceMax")) || 300000;

    const terms = location.split(/\s+/).map((term) => term.trim());
    const regexPattern = terms.map((term) => `(?=.*${term})`).join("");
    const locationPattern = new RegExp(regexPattern, "i");

    // Match location pattern against database fields
    let query = {
      $and: [
        { "cost.monthly": { $gte: priceMin, $lte: priceMax } },
        {
          $or: [
            { description: { $regex: locationPattern } },
            { name: locationPattern },
            { "location.station": locationPattern },
            { "location.ward": locationPattern },
            { "location.city": locationPattern },
            { "location.floor": locationPattern },
          ],
        },
      ].filter(Boolean),
    };

    // Only check for propertyType if its not 'All'
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
