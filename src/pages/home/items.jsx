import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import NavPanel from "../../components/mobileNavPanel"; // your nav panel component

export default function Items() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/`)
        .then((res) => {
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, [state]);

  return (
    <div className="relative w-full h-full pt-[50px] px-4">
      {/* Nav panel */}
      <NavPanel className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50" />

      {/* Loader */}
      {state === "loading" && (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin" />
        </div>
      )}

      {/* Success - show products */}
      {state === "success" && (
        <>
          {items.length === 0 ? (
            <div className="w-full text-center text-gray-500 py-10">
              No products available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-0">
              {items.map((item) => (
                <ProductCard key={item.key} item={item} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Error state */}
      {state === "error" && (
        <div className="w-full flex justify-center items-center text-red-500 font-medium">
          Failed to load products.
        </div>
      )}
    </div>
  );
}
