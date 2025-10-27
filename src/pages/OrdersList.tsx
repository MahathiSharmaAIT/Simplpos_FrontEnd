import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../types/order";
import { getOrders, deleteOrder } from "../api/ordersApi";
import { OrderTable } from "../components/OrderTable";

export const OrdersList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Delete order
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteOrder(id);
      await fetchOrders();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <div className="p-8 space-y-6 text-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black flex items-center gap-2">
          <span>📋 Orders</span>
        </h1>

        {/* ➕ Redirect to New Order Page */}
        <button
          onClick={() => navigate("/orders/new")}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white font-semibold"
        >
          + New Order
        </button>
      </div>

      {/* ✅ Orders Table */}
      {orders.length > 0 ? (
        <OrderTable
          orders={orders}
          onEdit={(order) => navigate(`/orders/${order._id}/edit`)} // ✏️ Redirect to edit
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-gray-500 mt-6">No orders found.</p>
      )}
    </div>
  );
};
