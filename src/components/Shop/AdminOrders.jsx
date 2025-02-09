// src/components/Shop/AdminOrders.jsx
// src/components/Shop/AdminOrders.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrders, updateOrderStatus } from "../../features/shop/userSlice";
import "./AdminOrders.css";
import AdminNavbar from "./AdminNavbar";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  return (
    <div>
      <AdminNavbar />
      <div className="admin-orders-container">
        <h2>All Orders</h2>
        {status === "loading" && <p>Loading orders...</p>}
        {status === "failed" && <p className="error">{error}</p>}
        {orders.length === 0 ? (
          <p className="no-orders">No orders available.</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer?.username || "N/A"}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <ul>
                      {order.items?.map((item) => (
                        <li key={item.id}>
                          {item.product?.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
