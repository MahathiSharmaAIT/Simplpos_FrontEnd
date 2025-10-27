import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "../types/category";
import {
  createCategory,
  updateCategory,
  getCategories,
} from "../api/categoriesApi";

export const CategoryFormPage = () => {
  const [form, setForm] = useState<Partial<Category>>({
    name: "",
    description: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        const all = await getCategories();
        const existing = all.find((c) => c._id === id);
        if (existing) setForm(existing);
      })();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) await updateCategory(id, form);
    else await createCategory(form as Category);
    navigate("/categories");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-black">
        {id ? "Edit Category" : "Add New Category"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-sm">Category Name</label>
          <input
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter category name"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Description</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Enter description (optional)"
            className="border p-2 w-full rounded"
            rows={3}
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
          >
            {id ? "Update" : "Save"} Category
          </button>
        </div>
      </form>
    </div>
  );
};
