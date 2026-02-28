
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/login";
// import Register from "./components/Register";

// import UserProfile from "./components/UProfile";
// import Navbar from "./components/Navbar";

// import ContactManagement from "./components/Contact";


// function App() {
//   const isLoggedIn = !!localStorage.getItem("token");

//   return (
//     <BrowserRouter>
//       {isLoggedIn && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
        
//         <Route path="/profile" element={<UserProfile />} />
//         <Route path="/contact" element={<ContactManagement/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Register";
import Profile from "./components/UProfile";
import ContactManagement from "./components/Contact";
import Navbar from "./components/Navbar";
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