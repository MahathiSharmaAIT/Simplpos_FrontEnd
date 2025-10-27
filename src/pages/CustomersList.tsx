import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../types/customer";
import { getCustomers, deleteCustomer } from "../api/customersApi";
import { CustomerTable } from "../components/CustomersTable";

export const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (err: any) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 text-black">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">👥 Customers</h1>
        <button
          onClick={() => navigate("/customers/new")}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white font-semibold"
        >
          + Add Customer
        </button>
      </div>

      {customers.length ? (
        <CustomerTable
          customers={customers}
          onEdit={(c) => navigate(`/customers/${c._id}/edit`)}
          onDelete={handleDelete}
          
        />
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
};
