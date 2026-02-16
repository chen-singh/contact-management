
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Register";

import UserProfile from "./components/UProfile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./auth/protectedroute";
import ContactManagement from "./components/Contact";


function App() {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/contact" element={
          <ProtectedRoute>
            <ContactManagement />
          </ProtectedRoute>} /> */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contact" element={<ContactManagement/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
