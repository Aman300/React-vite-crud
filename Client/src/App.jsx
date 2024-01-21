
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/auth/Signup";
import Forgot from "./pages/auth/Forgot";
import Home from "./pages/dashboard/Home";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Contact from "./pages/dashboard/Contact";
export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        {/* Use the index route to render the layout */}
        <Route index element={<Home />} />
        <Route path="/contact-list" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgot />} />
    </Routes>
  </Router>

  );
}
