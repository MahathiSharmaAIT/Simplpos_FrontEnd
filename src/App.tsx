import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 🧱 Layout
import { DashboardLayout } from "./layouts/DashboardLayout";

// 🔐 Auth
import { Login } from "./pages/Login";

// 📦 Orders
import { OrdersList } from "./pages/OrdersList";
import { OrderFormPage } from "./pages/OrderFormPage";

// 👥 Customers
import { CustomersList } from "./pages/CustomersList";
import { CustomerFormPage } from "./pages/CustomerFormPage";

// 🛒 Products
import { ProductsList } from "./pages/ProductList";
import { ProductFormPage } from "./pages/ProductFormPage";

// 🏷️ Categories
import { CategoriesList } from "./pages/CategoriesList";
import { CategoryFormPage } from "./pages/CategoryFormPage";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 Login Page */}
        <Route path="/login" element={<Login />} />

        {/* ===================== */}
        {/* DASHBOARD ROUTES WITH SIDEBAR */}
        {/* ===================== */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <OrdersList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <OrderFormPage mode="create" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id/edit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <OrderFormPage mode="edit" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* 👥 Customers */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CustomersList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CustomerFormPage mode="create" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id/edit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CustomerFormPage mode="edit" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* 🛒 Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductsList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductFormPage  />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductFormPage  />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* 🏷️ Categories */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CategoriesList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CategoryFormPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:id/edit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CategoryFormPage/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to Orders */}
        <Route path="*" element={<Navigate to="/orders" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
