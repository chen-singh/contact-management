
// import './App.css';

// import Header from './components/Header';

// function App() {
//   return (
//     // <BrowserRouter>
//     //     <Routes>
//     //     <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
//     //     <Route path="/login" element={<Login />} />
//     //     <Route path="/register" element={<Register />} />
//     //     </Routes>
//     // </BrowserRouter>
//     <Header/>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
