import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderUser = () => {
  const [cartItems, setCartItems] = useState([]);
  const [time, setTime] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const abortController = new AbortController();

      try {
        const userId = JSON.parse(localStorage.getItem("user"))._id;

        const response = await axios.get(
          `http://localhost:3333/orders/${userId}`,
          {
            headers: {
              auth_token: localStorage.getItem("auth-token"),
            },
            signal: abortController.signal, // Add signal to cancel the request on component unmount
          }
        );
        setData(response.data.order[0]);
        const flatten = response.data.order.reduce((acc, curr) => {
          return [...acc, ...curr.items];
        }, []);

        const unique = [...new Set(flatten.map((item) => item._id))].map((id) => {
          const qty = flatten.find((item) => item._id === id);
          return {
            ...qty,
            qty: flatten.filter((item) => item._id === id).length,
          };
        });

        setCartItems(unique);

        // If order is accepted, start timer for 5 minutes
        if (response.data.order[0].accepted === true) {
          setTime(10); 
        }
      } catch (error) {
        console.error(error);
      }

      return () => abortController.abort();
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (time > 0) {
      const tick = () => {
        // If order is ready, stop timer
        setTime((prevTime) => prevTime - 1);
      };
      timer = setInterval(tick, 1000);
    }

    return () => clearInterval(timer); 
  }, [time]);

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
            <Status time={time} data={data} />
          </li>
        ))}

        <li>
          <p>Total</p>
          <p>
            $
            {cartItems
              .reduce((acc, curr) => acc + curr.price * curr.qty, 0)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </p>
        </li>
      </ul>
    </div>
  );
};

// This component is used to display the status of the order (pending, ready, etc.)
const Status = ({ time, data }) => {
  if (data.accepted && !data.ready) {
    if (time === 0) {
      axios.put(`http://localhost:3333/orders/${data._id}`, {
        ready: true,
        },
        {
          headers: {
            auth_token: localStorage.getItem("auth-token"),
            },
            });
      return <p>Order Ready</p>;
    } else {
      const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
      const seconds = String(time % 60).padStart(2, 0);
      return (
        <p>
          Order Ready in:
          {minutes}:{seconds}
        </p>
      );
    }
  } else if (data.ready) {
    return <p>Order Ready</p>;
  } else {
    return <p>Pending</p>;
  }
};

export default OrderUser;
