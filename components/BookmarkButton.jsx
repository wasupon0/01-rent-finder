"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch(`/api/bookmarks/check`, {
          method: "POST",
          body: JSON.stringify({
            propertyId: property._id,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [property._id, userId]);

  async function handleClick() {
    if (!userId) {
      toast.error("You need to be logged in to bookmark a property");
      return;
    }

    try {
      const res = await fetch(`/api/bookmarks/`, {
        method: "POST",
        body: JSON.stringify({
          propertyId: property._id,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("A bookmark error occurred. Please try again.");
    }
  }

  if (loading) return <p className="text-center">Loading...</p>;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-600"
    >
      <FaBookmark className="mr-2 " /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600"
    >
      <FaBookmark className="mr-2 " /> Bookmark Property
    </button>
  );
};
export default BookmarkButton;
