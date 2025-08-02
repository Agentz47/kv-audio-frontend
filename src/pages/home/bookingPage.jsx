import { useState, useEffect } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());
  const [startingDate, setStartingDate] = useState(formatDate(new Date()));
  const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
  const [total, setTotal] = useState(0);
  const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

  function reloadCart() {
    setCart(loadCart());
    calculateTotal();
    
  }
  function calculateTotal(){
    const cartInfo = loadCart();
    cartInfo.startingDate = startingDate;
    cartInfo.endingDate = endingDate;
    cartInfo.days = daysBetween;
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
      cartInfo
    ).then((res)=>{
      console.log(res.data)
      setTotal(res.data.total);
    }).catch((err)=>{
      console.error(err);
    })
  }

  useEffect(()=>{
    calculateTotal();
  },[startingDate, endingDate])

  function handleBookingCreation() {
    const bookingData = {
      ...cart,
      startingDate,
      endingDate,
      days: daysBetween,
    };

    const token = localStorage.getItem("token");
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("cart");
        toast.success("Booking created");
        setCart(loadCart());
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create booking");
      });
  }

  return (
    <div className="w-full h-full flex flex-col items-center px-4">
      <h1 className="text-2xl font-semibold my-4">Create Booking</h1>

      {/* Booking Duration Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl">
        <div className="flex flex-col w-full">
          <label htmlFor="startDate" className="text-sm font-medium mb-1 text-gray-700">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
            className="border border-secondary rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="endDate" className="text-sm font-medium mb-1 text-gray-700">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endingDate}
            onChange={(e) => setEndingDate(e.target.value)}
            className="border border-secondary rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Duration Display */}
      <div className="mb-6 text-sm text-gray-700">
        Booking Duration: <span className="font-semibold text-accent">{daysBetween} days</span>
      </div>

      {/* Cart Items */}
      <div className="w-full flex flex-col items-center">
        {cart?.orderedItems?.length > 0 ? (
          cart.orderedItems.map((item) => (
            <BookingItem itemKey={item.key} key={item.key} qty={item.qty} refresh={reloadCart} />
          ))
        ) : (
          <div className="text-gray-500">Your cart is empty.</div>
        )}
      </div>

      <div className="w-full flex justify-center mt-4">
        <p className="text-accent font-semibold">Total: {total.toFixed(2)}</p>
      </div>

      {/* Bottom Buttons */}
      <div className="w-full flex justify-center mt-8">
        <button
          className="bg-accent text-white px-4 py-2 rounded-lg"
          onClick={handleBookingCreation}
          disabled={!cart?.orderedItems?.length}
        >
          Create Booking
        </button>
      </div>
    </div>
  );
}
