import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Customer } from "../types/customer";
import { createCustomer, getCustomerById, updateCustomer } from "../api/customersApi";

interface Props {
  mode: "create" | "edit";
}

export const CustomerFormPage = ({ mode }: Props) => {
  const [form, setForm] = useState<Customer>({ name: "", email: "", phone: "", address: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (mode === "edit" && id) {
    getCustomerById(id).then((data) => setForm(data));
    }
  }, [id, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") await createCustomer(form);
    else if (mode === "edit" && id) await updateCustomer(id, form);
    navigate("/customers");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-6">
          {mode === "create" ? "Add New Customer" : "Edit Customer"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/customers")}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            >
              {mode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
