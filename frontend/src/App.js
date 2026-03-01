

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Register";
import Profile from "./components/UProfile";
import ContactManagement from "./components/Contact";

import PrivateRoute from "./components/PrivateRoute";

function App() {


  return (
    <BrowserRouter>
     
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PrivateRoute>
              <ContactManagement />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;