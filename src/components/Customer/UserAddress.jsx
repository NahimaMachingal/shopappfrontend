import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitAddress, submitOrder } from "../../features/customer/customerSlice";
import "./UserAddress.css";
import Navbar from "./Navbar";
useSelector
const UserAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?.id); // Get authenticated user ID
  const cartItems = useSelector((state) => state.customer?.cart || []);

  console.log("Cart Items:", cartItems);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
        console.error("User is not authenticated");
        return;
    }

    try {
        // Log the cart items before mapping
      console.log("Cart items before mapping:", cartItems);
      const orderData = {
        street: address.street,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        cart_items: cartItems.map(item => ({
            product_id: item.product, // Changed this line - use item.product directly
            quantity: item.quantity
        }))
    };

      // Log final order data
      console.log("Order data being sent:", orderData);
        const response = await dispatch(submitOrder(orderData)).unwrap();
        navigate("/order-success");
    } catch (error) {
        console.error("Error submitting order:", error);
    }
};
  
  


  return (
    <div>
        <Navbar />
    
    <div className="user-address-container">
      <h2 className="user-address-title">Enter Your Address</h2>
      <form onSubmit={handleSubmit} className="user-address-form">
        <input
          type="text"
          name="street"
          placeholder="Street"
          className="user-address-input"
          value={address.street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="user-address-input"
          value={address.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          className="user-address-input"
          value={address.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          className="user-address-input"
          value={address.zip_code}
          onChange={handleChange}
          required
        />
        <button type="submit" className="user-address-button">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default UserAddress;
