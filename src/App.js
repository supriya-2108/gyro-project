import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import OrderOnline from "./pages/OrderOnline";
import OrderSummary from "./pages/MyCart";
import { AppProvider } from "./Context";
import Login from "./pages/Login";
import AdminLogin from "./pages/Admin/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProductList from "./pages/Admin/ProductList";
import AdminUsers from "./pages/Admin/Users";
import AdminRegister from "./pages/Admin/Register";
import MyCart from "./pages/MyCart";
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orderOnline" element={<OrderOnline />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/productList" element={<AdminProductList />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
