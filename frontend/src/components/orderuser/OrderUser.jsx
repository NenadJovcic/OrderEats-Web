import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/orderuser.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("auth-token");
      const config = {
        headers: { auth_token: token },
      };
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      // Fetch orders from backend (replace the URL with your actual API endpoint)
      const response = await axios.get(
        `http://localhost:3333/orders/${userId}`,
        config
      );
      console.log(response.data);
      setOrders(response.data.order);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Orders</h1>

      <div className="orderuser-flex">
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h3>Order ID: {order._id}</h3>
            <h4>Status: {order.ready ? "Ready" : "Not Ready"}</h4>
            <h4>
              Accepted: {order.accepted ? "Accepted" : "Not Accepted Yet"}
            </h4>
            <h4>
              Pickup Time:{" "}
              {new Date(
                new Date(order.createdAt).getTime() + 30 * 60 * 1000
              ).toLocaleString()}
            </h4>
            <h5>Items:</h5>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  <img
                    src={item.photo}
                    alt={item.name}
                    style={{ width: "100px" }}
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrdersList;
