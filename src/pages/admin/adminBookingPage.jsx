import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [modelOpened, setModelOpened] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchOrders();
    }
  }, [loading]);

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full max-w-6xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Days</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Approved</th>
              <th className="border border-gray-300 px-4 py-2">Total (Rs.)</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center cursor-pointer" onClick={()=>{
                setActiveOrder(order);
                setModelOpened(true);
              }}>
                <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                <td className="border border-gray-300 px-4 py-2">{order.email}</td>
                <td className="border border-gray-300 px-4 py-2">{order.days}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.startingDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.endingDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.isApproved ? "✅ Yes" : "❌ Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.totalAmount.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.orderDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {
        modelOpened &&(
            <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] flex justify-center items-center">
                <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
                    <div className="flex flex-col gap-2">
                        <p><span className="font-semibold">Order ID:</span>{activeOrder.orderId}</p>
                        <p><span className="font-semibold">Email:</span>{activeOrder.email}</p>
                        <p><span className="font-semibold">Days:</span>{activeOrder.days}</p>
                        <p><span className="font-semibold">Starting Date:</span>{new Date(activeOrder.startingDate).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Ending Date:</span>{new Date(activeOrder.endingDate).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Total Amount:</span>{activeOrder.totalAmount.toFixed(2)}</p>
                        <p><span className="font-semibold">Approval Status:</span>{activeOrder.isApproved? "Approved" : "Pending"}</p>
                        <p><span className="font-semibold">Order Date:</span>{new Date(activeOrder.orderDate).toLocaleDateString()}</p>

                    </div>
                </div>
                {
                    activeOrder.orderedItems.map((item)=>{
                        return(
                            <div key={item.key}></div>
                        )
                    })
                }
            </div>
        )
      }

      {/* Button to manually refresh orders */}
      <button
        onClick={() => setLoading(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh Orders
      </button>
    </div>
  );
}
