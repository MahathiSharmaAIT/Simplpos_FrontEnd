import { Product } from "../types/product";
import { useNavigate } from "react-router-dom";

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
}

export const ProductTable = ({ products, onDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p._id}
              className="border-b hover:bg-gray-50 transition text-gray-800"
            >
              <td className="p-3">{p.name}</td>
              <td className="p-3">
                {typeof p.category === "object" && "name" in p.category
                  ? p.category.name
                  : p.category}
              </td>
              <td className="p-3">${p.price.toFixed(2)}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => navigate(`/products/edit/${p._id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p._id!)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <p className="text-gray-500 text-center py-3">No products found.</p>
      )}
    </div>
  );
};
