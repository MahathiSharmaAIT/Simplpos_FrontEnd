import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../types/category";
import { getCategories, deleteCategory } from "../api/categoriesApi";
import { CategoryTable } from "../components/CategoryTable";

export const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black flex items-center gap-2">
          🗂️ Categories
        </h1>
        <button
          onClick={() => navigate("/categories/new")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
        >
          + New Category
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onDelete={async (id) => {
          await deleteCategory(id);
          fetchCategories();
        }}
      />
    </div>
  );
};
