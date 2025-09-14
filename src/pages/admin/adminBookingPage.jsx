import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

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

  function handleOrderStatusChange(orderId, status){
    const token = localStorage.getItem("token");
    console.log(orderId, status);
    axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(()=>{
      console.log("Order status updated");
      setModelOpened(false);
      setLoading(true);
    }).catch((err)=>{
      console.error(err);
      setLoading(true);
    })
  }

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
                  {order.status}
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
                <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg relative">
                  <IoMdCloseCircleOutline className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600" onClick={()=>setModelOpened(false)}/>
                    <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
                    <div className="flex flex-col gap-2">
                        <p><span className="font-semibold">Order ID:</span>{activeOrder.orderId}</p>
                        <p><span className="font-semibold">Email:</span>{activeOrder.email}</p>
                        <p><span className="font-semibold">Days:</span>{activeOrder.days}</p>
                        <p><span className="font-semibold">Starting Date:</span>{new Date(activeOrder.startingDate).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Ending Date:</span>{new Date(activeOrder.endingDate).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Total Amount:</span>{activeOrder.totalAmount.toFixed(2)}</p>
                        <p><span className="font-semibold">Approval Status:</span>{activeOrder.status}</p>
                        <p><span className="font-semibold">Order Date:</span>{new Date(activeOrder.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div className="my-5 w-full flex items-center">
                      <button onClick={()=>{
                        handleOrderStatusChange(activeOrder.orderId, "Approved")
                      }} className="flex bg-green-600 text-white px-4 py-1 rounded-md">Approve</button>
                      <button onClick={()=>{
                        handleOrderStatusChange(activeOrder.orderId, "Rejected")
                      }} className="flex bg-red-600 text-white px-4 py-1 rounded-md ml-4">Reject</button>

                    </div>
                    <table className="w-full mt-4">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                    activeOrder.orderedItems.map((item)=>{
                        return(
                          <tr key={item.product.key}>
                              <td><img src={item.product.image} alt={item.product.name} className="w-10 h-10"/></td>
                              <td>{item.product.name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.product.price}</td>
                          </tr>
                        )
                    })
                }
                      </tbody>
                    </table>
                    
                </div>
                
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
