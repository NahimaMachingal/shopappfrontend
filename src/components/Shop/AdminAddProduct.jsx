// src/components/Shop/AdminAddProduct.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/shop/userSlice';
import { useNavigate } from 'react-router-dom';
import './AdminAddProduct.css'
import AdminNavbar from './AdminNavbar'
const AdminAddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });
    dispatch(addProduct(productData));
    navigate('/adminproducts');
  };

  return (
    <div>
        <AdminNavbar />
    
    <div className="admin-products-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
    </div>
  );
};

export default AdminAddProduct;