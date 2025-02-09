import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminHome from './components/Auth/AdminHome';
import './App.css';
import AdminProducts from './components/Shop/AdminProducts';
import AdminAddProduct from './components/Shop/AdminAddProduct';
import Cart from './components/Customer/Cart';
import UserAddress from './components/Customer/UserAddress';
import OrderSuccess from './components/Customer/OrderSuccess';
import Dashboard from './components/Customer/Dashboard';
import AdminOrders from './components/Shop/AdminOrders';
import { ToastContainer } from "react-toastify";
import AuthHOC from './components/utils/AuthHOC';

function App() {
  const restrictedPaths = [
    "/home",
    "/mhome",
    "/adminhome",
    "/adminproducts",
    "/admin/add-product",
    "/cart",
    "/user-address",
    "/dashboard",
    "/adminorders",
  ]
  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} />
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminhome" element=
        {
          <AuthHOC restrictedPaths={restrictedPaths}>
        <AdminHome />
        </AuthHOC>
        } />
        <Route path="/adminproducts" element={
          <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminProducts />
            </AuthHOC>} />
        <Route path="/admin/add-product" element={
          <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminAddProduct />
            </AuthHOC>} />        
        <Route path="/cart" element={
          <AuthHOC restrictedPaths={restrictedPaths}><Cart /> </AuthHOC>} />
        <Route path="/user-address" element={
          <AuthHOC restrictedPaths={restrictedPaths}><UserAddress /> </AuthHOC>} />
        <Route path="/order-success" element={
          <AuthHOC restrictedPaths={restrictedPaths}><OrderSuccess /> </AuthHOC>} />
        <Route path="/dashboard" element={
          <AuthHOC restrictedPaths={restrictedPaths}><Dashboard /> </AuthHOC>} />
        <Route path="/adminorders" element={
          <AuthHOC restrictedPaths={restrictedPaths}><AdminOrders /> </AuthHOC>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
