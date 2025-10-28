import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

interface Props {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: "Orders", path: "/orders" },
    { name: "Customers", path: "/customers" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className={`${isOpen ? "block" : "hidden"} text-lg font-bold`}>
            SimplPOS
          </span>
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                location.pathname.startsWith(item.path)
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {isOpen ? item.name : item.name.charAt(0)}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-700 text-xs text-gray-400">
          {isOpen && "© 2025 SimplPOS"}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  );
};
