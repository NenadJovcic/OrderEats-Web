import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderUser = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
  const fetchOrders = async () => {
    let flatten 
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;

      const response = await axios.get(`http://localhost:3333/orders/${userId}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        signal: abortController.signal,
      });

      const orders = response.data.order;
       flatten = orders.flatMap((order) => order.items);
      const uniqueItems = flatten.reduce((unique, item) => {
        const existingItemIndex = unique.findIndex((uniqueItem) => uniqueItem._id === item._id);

        if (existingItemIndex !== -1) {
          unique[existingItemIndex].qty++;
        } else {
          unique.push({ ...item, qty: 1 });
        }

        return unique;
      }, []);

      setCartItems(uniqueItems);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
      }
    }
  };

  const abortController = new AbortController();

  fetchOrders();

  return () => {
    abortController.abort();
  };
}, []);


  return (
    <div className="order_container">
      <h1>Order</h1>
      <ul className="order_list">
        {cartItems.map((item) => (
          <li key={item._id}>
            <img src={item.photo} alt={item.name} style={{ width: "100px" }} />
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Qty: {item.qty}</p>
            <p>Total: ${item.qty * item.price} </p>
          </li>
        ))}

        <li>
          <p>Total</p>
          <p>
            $
            {cartItems.reduce((total, item) => {
              return total + item.qty * item.price;
            }, 0)}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default OrderUser;
