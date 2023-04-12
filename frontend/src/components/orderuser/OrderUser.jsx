import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderUser = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    const userId = user._id;
    console.log(userId);

    // stop rendering the data after the first time
    // const abortController = new AbortController();
    axios
      .get(`http://localhost:3333/orders/${userId}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        // create property for each item in the order before mapping it
        const flatten = res.data.order
          .map((element) => ({
            ...element,
          }))
          .reduce((acc, curr) => {
            return [...acc, ...curr.items];
          }, []);
        setData(flatten);

        // remove duplicates
        const unique = [...new Set(flatten.map((item) => item._id))].map(
          (id) => {
            const qty = flatten.find((item) => item._id === id);
            return {
              ...qty,
              qty: flatten.filter((item) => item._id === id).length,
            };
          }
        );

        setCartItems(unique);
      });
    // return () => abortController.abort();
  }, []);

  return (
    <div className="order_container">
      <h1>Order</h1>
      <ul className="order_list">
        {cartItems.map((item) => (
          <li key={item._id}>
            <img src={item.photo} alt={item.name} style={{ width: "100px" }} />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>Qty: {item.qty}</p>
            <p>Total: ${item.qty * item.price} </p>
          </li>
        ))}

        <li>
          <p>Total</p>
          <p>
            $
            {data
              .reduce((acc, item) => acc + item.price, 0)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default OrderUser;
