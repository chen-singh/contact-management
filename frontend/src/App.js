
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Register";
import Contacts from "./components/Contact";
import UserProfile from "./components/UProfile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./auth/protectedroute";

function App() {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
