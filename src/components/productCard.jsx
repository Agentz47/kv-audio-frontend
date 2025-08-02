import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="w-max h-max rounded-2xl overflow-hidden shadow-md border border-secondary bg-white hover:shadow-lg transition-shadow duration-300 m-4">
      {/* Image */}
      <img
        className="w-full h-48 object-cover"
        src={item.image[0]}
        alt={item.name}
      />

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {item.description}
        </p>

        {/* Category and Price */}
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-500 italic">{item.category}</span>
          <span className="text-accent font-bold">Rs. {item.price}</span>
        </div>

        {/* Availability */}
        <span
          className={`mt-1 w-fit px-3 py-1 rounded-full text-xs font-medium ${
            item.availability
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.availability ? "In Stock" : "Out of Stock"}
        </span>

        {/* Dimensions */}
        <div className="text-xs text-gray-500 mt-1">
          Dimensions: {item.dimensions}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <Link
          to={`/product/${item.key}`}
          className="block w-full text-center bg-accent text-white font-semibold py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
