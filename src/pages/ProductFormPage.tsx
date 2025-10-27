import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../types/product";
import { getCategories } from "../api/categoriesApi";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "../api/productsApi";

export const ProductFormPage = () => {
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "",
  });
  const [categories, setCategories] = useState<any[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getCategories();
      setCategories(cats);
      if (id) {
        const all = await getProducts();
        const existing = all.find((p) => p._id === id);
        if (existing) setForm(existing);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) await updateProduct(id, form);
    else await createProduct(form as Product);
    navigate("/products");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-black">
        {id ? "Edit Product" : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Product Name"
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="number"
          value={form.price || 0}
          onChange={(e) => setForm({ ...form, price: +e.target.value })}
          placeholder="Price"
          className="border p-2 w-full rounded"
          required
        />

        <select
          value={
            typeof form.category === "string"
              ? form.category
              : form.category?._id || ""
          }
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
          >
            {id ? "Update" : "Save"} Product
          </button>
        </div>
      </form>
    </div>
  );
};
