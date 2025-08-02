import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart, updateCartQty } from "../utils/cart";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function BookingItem({ itemKey, qty, refresh }) {
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          removeFromCart(itemKey);
          refresh();
        });
    }
  }, [status]);

  useEffect(() => {
    updateCartQty(itemKey, quantity);
    refresh();
  }, [quantity]);


  if (status === "loading") {
    return (
      <div className="bg-secondary p-4 rounded-lg animate-pulse text-gray-500">
        Loading item...
      </div>
    );
  }

  if (status === "error" || !item) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        Failed to load item.
      </div>
    );
  }

  const total = item.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-secondary rounded-xl p-4 shadow-md w-full max-w-3xl">
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md border border-primary"
      />

      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
      </div>

      <div className="text-right">
        <p className="text-accent font-medium">{item.price.toFixed(2)}</p>
        <p className="font-medium w-[50px] text-center relative flex justify-center items-center">
          <button className="absolute right-[-5px] hover:text-accent"
            onClick={() => {
              addToCart(itemKey, 1);
              refresh();
            }}
          >
            <FaPlus />
          </button>
          {qty}
          <button className="absolute left-[-5px] hover:text-accent"
            onClick={() => {
              if (qty == 1) {
                removeFromCart(itemKey);
                refresh();
              } else {
                addToCart(itemKey, - 1);
                refresh();
              }
            }}
          >
          <FaMinus />
        </button>
      </p>
      <p className="text-[17px] font-semibold text-accent">{(item.price * qty).toFixed(2)}</p>
    </div>

      
    </div >
  );
}
