import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OrdersList } from "./pages/OrdersList";
import { Login } from "./pages/Login";
import { OrderFormPage } from "./pages/OrderFormPage"; // ⬅️ new page
import { CustomerFormPage } from "./pages/CustomerFormPage"; // ⬅️ new page
import { CustomersList } from "./pages/CustomersList"; // ⬅️ new page




// Protect /orders routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersList />
            </ProtectedRoute>
          }
        />

        {/* ➕ Create New Order */}
        <Route
          path="/orders/new"
          element={
            <ProtectedRoute>
              <OrderFormPage mode="create" />
            </ProtectedRoute>
          }
        />

        {/* ✏️ Edit Order */}
        <Route
          path="/orders/:id/edit"
          element={
            <ProtectedRoute>
              <OrderFormPage mode="edit" />
            </ProtectedRoute>
          }
        />
        <Route
  path="/customers"
  element={
    <ProtectedRoute>
      <CustomersList />
    </ProtectedRoute>
  }
/>

<Route
  path="/customers/new"
  element={
    <ProtectedRoute>
      <CustomerFormPage mode="create" />
    </ProtectedRoute>
  }
/>

<Route
  path="/customers/:id/edit"
  element={
    <ProtectedRoute>
      <CustomerFormPage mode="edit" />
    </ProtectedRoute>
  }
/>


        <Route path="*" element={<Navigate to="/orders" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
