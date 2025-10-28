import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Package, ShoppingCart, Users, Tags } from "lucide-react";

interface Props {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: "Orders", path: "/orders", icon: <ShoppingCart size={20} /> },
    { name: "Customers", path: "/customers", icon: <Users size={20} /> },
    { name: "Products", path: "/products", icon: <Package size={20} /> },
    { name: "Categories", path: "/categories", icon: <Tags size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-black transition-all duration-300">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white h-screen p-4 flex flex-col transition-all duration-300 ${
          isOpen ? "w-56" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-white mb-6 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-md p-2 transition-all ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                title={!isOpen ? item.name : ""}
              >
                {item.icon}
                {isOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Footer */}
        {isOpen && (
          <p className="text-xs text-gray-400 mt-4 text-center">
            © {new Date().getFullYear()} Orders System
          </p>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};
