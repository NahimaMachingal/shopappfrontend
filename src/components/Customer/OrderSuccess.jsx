import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
        <Navbar />
   
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => navigate("/home")}
      >
        Go to Home
      </button>
    </div>
    </div>
  );
};

export default OrderSuccess;
