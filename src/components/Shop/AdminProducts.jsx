// src/components/Shop/AdminProducts.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/shop/userSlice';
import './AdminProducts.css';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(products)

  return (
    <div>
      <AdminNavbar />
      <div className="admin-products-container">
        <h2>All Products</h2>
        <button className="add-product-btn" onClick={() => navigate('/admin/add-product')}>
          Add Product
        </button>
        {status === 'loading' && <p>Loading products...</p>}
        {status === 'failed' && <p className="error">{error}</p>}
        {products.length === 0 ? (
          <p className="no-products">No products AVAILABLE</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {product.image ? (
                      <img
                      src={`https://res.cloudinary.com/ddaxdjzyk/${product.image}`}
                      alt={product.name}
                      className="product-img"
                    />
                    
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.average_rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
