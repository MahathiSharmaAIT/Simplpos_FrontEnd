import { useEffect, useState } from "react";
import { Order } from "../types/order";
import axios from "axios";

interface Props {
  onSubmit: (order: Order) => void;
  initialData?: Order;
}

interface Item {
  _id: string;
  name: string;
  price: number;
  category: string;
}

interface Category {
  _id: string;
  name: string;
}

export const OrderForm = ({ onSubmit, initialData }: Props) => {
  const [form, setForm] = useState<Order>(
    initialData || {
      customer: "",
      orderNumber: "",
      items: [],
      totalAmount: 0,
      status: "Pending",
    }
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // ✅ Fetch categories on mount
  useEffect(() => {
    axios.get("http://localhost:4000/api/categories").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  // ✅ Fetch items when category changes
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`http://localhost:4000/api/items?category=${selectedCategory}`)
        .then((res) => {
          setItems(res.data.data);
        });
    }
  }, [selectedCategory]);

  // ✅ Add item to order
  const handleAddItem = () => {
    const item = items.find((i) => i._id === selectedItem);
    if (!item) return;

    const newItems = [
      ...form.items,
      { name: item.name, quantity, price: item.price },
    ];

    const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    setForm({ ...form, items: newItems, totalAmount: total });
    setQuantity(1);
    setSelectedItem("");
  };

  // ✅ Update quantity
  const handleQuantityChange = (index: number, newQty: number) => {
    const newItems = [...form.items];
    newItems[index].quantity = newQty;

    const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    setForm({ ...form, items: newItems, totalAmount: total });
  };

  // ✅ Remove item
  const handleRemoveItem = (index: number) => {
    const newItems = form.items.filter((_, i) => i !== index);
    const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    setForm({ ...form, items: newItems, totalAmount: total });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold mb-2">Create New Order</h2>

      {/* Customer ID */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Customer ID</label>
        <input
          value={
            typeof form.customer === "string"
              ? form.customer
              : form.customer?._id || ""
          }
          onChange={(e) => setForm({ ...form, customer: e.target.value })}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
      </div>

      {/* Order Number */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Order Number</label>
        <input
          value={form.orderNumber}
          onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
      </div>

      {/* Select Category */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Select Product */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-semibold">Product</label>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Select product</option>
            {items.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name} — ${i.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold">Qty</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="w-20 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="bg-indigo-600 hover:bg-gray-400 text-white hover:text-black px-3 py-2 rounded transition"
        >
          Add
        </button>
      </div>

      {/* ✅ Editable Products List */}
      {form.items.length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-2">Products Added:</h4>
          <ul className="bg-gray-100 rounded p-3 space-y-2 text-sm">
            {form.items.map((i, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-none"
              >
                <div className="flex flex-col w-full">
                  <span className="font-medium">{i.name}</span>
                  <div className="flex items-center gap-3 mt-1">
                    <label className="text-xs text-gray-500">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={i.quantity}
                      onChange={(e) =>
                        handleQuantityChange(idx, Number(e.target.value))
                      }
                      className="w-16 p-1 text-center border border-gray-300 rounded"
                    />

                    <span className="text-gray-600 text-sm">
                      ${i.price.toFixed(2)} each
                    </span>

                    <span className="font-semibold ml-auto">
                      ${(i.price * i.quantity).toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs ml-3"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between font-bold text-lg mt-2">
        <span>Total:</span>
        <span>${form.totalAmount.toFixed(2)}</span>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Status</label>
        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as Order["status"],
            })
          }
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-gray-400 hover:text-black text-white p-2 rounded font-semibold transition"
      >
        Save Order
      </button>
    </form>
  );
};
