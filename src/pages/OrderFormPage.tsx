import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "../types/order";
import { createOrder, getOrderById, updateOrder } from "../api/ordersApi";
import { OrderForm } from "../components/OrderForm";

interface Props {
  mode: "create" | "edit";
}

export const OrderFormPage = ({ mode }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch order if editing
  useEffect(() => {
    if (mode === "edit" && id) {
      setLoading(true);
      getOrderById(id)
        .then((data) => setInitialData(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [mode, id]);

  const handleSubmit = async (order: Order) => {
    try {
      if (mode === "create") {
        await createOrder(order);
      } else if (mode === "edit" && id) {
        await updateOrder(id, order);
      }
      navigate("/orders");
    } catch (err) {
      console.error("Failed to save order", err);
    }
  };

  if (loading) return <p className="text-gray-400">Loading order...</p>;

  return (
    <div className="min-h-screen bg-gray-200 text-black p-8">
      <div className="max-w-3xl mx-auto bg-gray-200 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">
          {mode === "create" ? "Create New Order" : "Edit Order"}
        </h1>

        <OrderForm
          onSubmit={handleSubmit}
          initialData={initialData || undefined}
        />

        <button
  onClick={() => navigate("/orders")}
  className="mt-4 bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded transition"
>
  ← Back to Orders
</button>

      </div>
    </div>
  );
};
