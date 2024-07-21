import Image from "next/image";
import Link from "next/link";
import {
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaRulerCombined,
  FaWalking,
} from "react-icons/fa";

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { cost } = property;

    if (cost.monthly) {
      return `${cost.monthly.toLocaleString()}`;
    } else if (cost.fee) {
      return `${cost.fee.toLocaleString()} yen`;
    } else if (cost.deposit) {
      return `${cost.deposit.toLocaleString()} yen`;
    }
  };

  return (
    <div className="relative flex flex-col bg-white shadow-md rounded-xl md:flex-row">
      <Image
        src={property.images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover w-full rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="mb-4 text-gray-600">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-orange-500 font-bold text-right md:text-center lg:text-right">
          ¥{getRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 mb-4 text-gray-500">
          <p>
            <FaClock className="inline-block mr-2" /> {property.age}{" "}
            <span className="md:hidden lg:inline">years</span>
          </p>
          <p>
            <FaWalking className="inline-block mr-2" /> {property.distance}{" "}
            <span className="md:hidden lg:inline">minutes</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_meter}{" "}
            <span className="md:hidden lg:inline">square meter</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-4 text-sm text-green-900">
          {property.cost.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Monthly
            </p>
          )}

          {property.cost.fee && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Fee
            </p>
          )}

          {property.cost.deposit && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Deposit
            </p>
          )}
        </div>

        <div className="mb-5 border border-gray-200"></div>

        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex gap-2 mb-4 align-middle lg:mb-0">
            <FaMapMarkerAlt className="text-lg text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {property.location.ward} {property.location.city}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FeaturedPropertyCard;
