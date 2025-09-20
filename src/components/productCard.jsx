import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md border border-secondary bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col group z-0">
      {/* Image */}
      <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          src={item.image?.[0] || "/placeholder.png"}
          alt={item.name}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-500" />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow gap-2">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          {item.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
          {item.description}
        </p>

        {/* Category and Price */}
        <div className="flex justify-between items-center text-xs sm:text-sm mt-2">
          <span className="text-gray-500 italic">{item.category}</span>
          <span className="text-accent font-bold">Rs. {item.price}</span>
        </div>

        {/* Availability */}
        <span
          className={`mt-1 w-fit px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
            item.availability
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.availability ? "In Stock" : "Out of Stock"}
        </span>

        {/* Dimensions */}
        <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
          Dimensions: {item.dimensions}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4 mt-auto">
        <Link
          to={`/product/${item.key}`}
          className="block w-full text-center bg-accent text-white font-semibold py-2 rounded-lg hover:bg-opacity-90 transition text-sm sm:text-base"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
