import { Order } from "../types/order";

interface Props {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

export const OrderTable = ({ orders, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-[#FFFFFF] rounded-xl p-6 shadow-lg">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
<tr className="bg-gray-100 text-black text-sm uppercase border-b border-gray-700">
            <th className="text-left p-3">Order #</th>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Customer</th>
            <th className="text-left p-3">Items</th>
            <th className="text-left p-3">Subtotal</th>
            <th className="text-left p-3">Tax</th>
            <th className="text-left p-3">Total</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((order) => (
            <tr
              key={order._id}
              className="bg-gray text-black hover:bg-gray-200 transition"           >
              <td className="p-3 font-semibold">{order.orderNumber}</td>
              <td className="p-3">
                {new Date(order.createdAt || "").toISOString().split("T")[0]}
              </td>
              <td className="p-3">
                {typeof order.customer === "object"
                  ? order.customer?.name ||
                    order.customer?.email ||
                    order.customer?._id
                  : order.customer}
              </td>
              <td className="p-3">{order.items.length} item(s)</td>
              <td className="p-3">${(order.totalAmount * 0.94).toFixed(2)}</td>
              <td className="p-3">${(order.totalAmount * 0.06).toFixed(2)}</td>
              <td className="p-3 font-bold">${order.totalAmount.toFixed(2)}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Completed"
                      ? "bg-green-700 text-green-200"
                      : order.status === "Cancelled"
                      ? "bg-red-700 text-red-200"
                      : "bg-yellow-700 text-yellow-200"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => onEdit(order)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(order._id!)}
                  className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between text-sm text-gray-400 mt-4">
        <p>Count: {orders.length}</p>
        <p>
          Sum Total: $
          {orders
            .reduce((sum, o) => sum + o.totalAmount, 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
};
