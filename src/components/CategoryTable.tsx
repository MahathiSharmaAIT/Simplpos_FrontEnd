import { Category } from "../types/category";
import { useNavigate } from "react-router-dom";

interface Props {
  categories: Category[];
  onDelete: (id: string) => void;
}

export const CategoryTable = ({ categories, onDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr
              key={c._id}
              className="border-b hover:bg-gray-50 transition text-gray-800"
            >
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.description || "-"}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => navigate(`/categories/edit/${c._id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(c._id!)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {categories.length === 0 && (
        <p className="text-gray-500 text-center py-3">No categories found.</p>
      )}
    </div>
  );
};
