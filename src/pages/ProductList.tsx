import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import { getProducts, deleteProduct } from "../api/productsApi";
import { ProductTable } from "../components/ProductTable";

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black flex items-center gap-2">
          📦 Products
        </h1>
        <button
          onClick={() => navigate("/products/new")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
        >
          + New Product
        </button>
      </div>

      <ProductTable products={products} onDelete={async (id) => {
        await deleteProduct(id);
        fetchProducts();
      }} />
    </div>
  );
};
