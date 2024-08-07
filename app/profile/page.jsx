"use client";

import profileDefault from "@/assets/images/profile.png";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user properties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        //Remove the property from city
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId,
        );
        setProperties(updatedProperties);

        toast.success("Property Deleted");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property");
    }
  };

  return (
    <section className="bg-orange-50">
      <div className="container py-24 m-auto">
        <div className="px-6 py-8 m-4 mb-4 bg-white border rounded-md shadow-md md:m-0">
          <h1 className="mb-4 text-2xl font-bold">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="mx-20 md:w-1/4">
              <div className="mb-4">
                <Image
                  className="w-32 h-32 mx-auto rounded-full md:h-48 md:w-48 md:mx-0"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="mb-4 text-xl">
                <span className="block font-bold">Name: </span> {profileName}
              </h2>
              <h2 className="text-xl">
                <span className="block font-bold">Email: </span> {profileEmail}
              </h2>
            </div>
            <br />
            <br />
            <div className="md:w-3/4 md:pl-4">
              <h2 className="mb-4 text-xl font-semibold">Your Listings</h2>
              <br />

              {!loading && properties.length === 0 && (
                <p>You have {properties.length} properties listings</p>
              )}

              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property, index) => (
                  <div key={property._id} className="mb-10">
                    <Link href={`properties/${property._id}`}>
                      <Image
                        className="object-cover w-full h-32 rounded-md"
                        src={property.images[0]}
                        width={500}
                        height={100}
                        priority={true}
                        alt={`Property ${index}`}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        {property.location.station} {property.location.ward}{" "}
                        {property.location.city}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="px-3 py-3 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
