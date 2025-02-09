import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { fetchProducts, addToCart } from '../../features/customer/customerSlice';
import Navbar from '../Customer/Navbar';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.customer);
  const accessToken = useSelector((state) => state.auth.accessToken) || localStorage.getItem("accessToken");
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem("user")); // Get user from Redux or localStorage

  useEffect(() => {
    if (!accessToken) {
      console.log("User is not authenticated. Redirecting to login...");
      navigate('/');
      return;
    }

    if (status === 'idle') {
      dispatch(fetchProducts(accessToken)); // Pass token to fetchProducts
    }
  }, [dispatch, status, accessToken, navigate]);

  const handleAddToCart = (product) => {
    if (!accessToken) {
      console.log("Redirecting to login...");
      navigate('/');
      return;
    }
  
    if (!user || !user.id) {
      console.log("User information is missing.");
      return;
    }
  
    console.log("Adding to cart and navigating to cart page...");
    dispatch(addToCart({ user_id: user.id, product_id: product.id, quantity: 1 }));
    navigate('/cart');
  };
  

  return (
    <div>
      <Navbar />
    
    <div className="home-container">
      {/* Display Authenticated User Info */}
        {user && (
          <div className="user-info">
            <p>Welcome, {user.username || user.email}!</p>
          </div>
        )}
      <h2>All Products</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={`https://res.cloudinary.com/ddaxdjzyk/${product.image}`}
              alt={product.name}
              className="product-img"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Rating: {product.average_rating}</p>
            <div className="button-group">
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;
