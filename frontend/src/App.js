
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/authContext";
import Login from "./pages/login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
 import ProtectedRoute from "./auth/protectedroute";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
