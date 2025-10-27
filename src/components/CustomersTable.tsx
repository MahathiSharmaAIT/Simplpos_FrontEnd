import { Customer } from "../types/customer";

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export const CustomerTable = ({ customers, onEdit, onDelete }: Props) => (
  <table className="w-full text-sm text-left border border-gray-200">
    <thead>
      <tr className="bg-gray-100 text-black uppercase text-xs border-b border-gray-300">
        <th className="p-3">Name</th>
        <th className="p-3">Email</th>
        <th className="p-3">Phone</th>
        <th className="p-3">Address</th>
        <th className="p-3 text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((c) => (
        <tr key={c._id} className="border-b hover:bg-gray-50">
          <td className="p-3">{c.name}</td>
          <td className="p-3">{c.email}</td>
          <td className="p-3">{c.phone}</td>
          <td className="p-3">{c.address}</td>
          <td className="p-3 text-right space-x-2">
            <button
              onClick={() => onEdit(c)}
              className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(c._id!)}
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
