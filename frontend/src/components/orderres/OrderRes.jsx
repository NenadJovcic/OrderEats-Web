import React, { useEffect, useState } from "react";
import "../../styles/orderres.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const RestaurantOrders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3333/orders");
      console.log(result.data.orders)
      setOrders(result.data.orders);
    };

    fetchData();
  }, []);

  // const orderList = [
  //   {
  //     _id: 1,
  //     items: [{ name: "Pizza" },
  //     { name: "Burger" }
  //     ],
  //     user: {
  //       userName: "Kristian",
  //       email: "blabla@skola.se"
  //     },
  //     total: 12.99,
  //     ready: true
  //   },
  // ];

  const Order = ({ items, user, total, _id, ready, }) => {


    return <div className="order">
      <input
        type="checkbox"
        checked={selectedOrders.includes(_id)}
        onChange={() =>
          console.log(selectedOrders.includes(_id))

        }
      />
      {items && items.map(item => <h3>{item.name}</h3>)}
      <p>{user.userName}</p>
      <p>{user.email}</p>
      <p>{total}</p>
    </div>
  }



  const OrderList = ({ orders }) => (
    <div className="order-list">
      {orders.map(({ _id, ready, ...rest }) => {
        if (!ready) {
          return <Order key={_id} {...rest} _id={_id} ready={ready} />
        }
      }
      )}
    </div>
  );

  const SelectedOrderList = ({ orders }) => (
    <div className="selected-order-list">
      <h1 className="title-orders">Waiting orders to collect by drivers:</h1>
      {orders.map(({ _id, ready, ...rest }) => {
        if (ready) {
          return <Order key={_id} {...rest} _id={_id} ready={ready} />
        }
      })}
    </div>
  );
  return (

    <div>
      <h1 className="title-orders">Income Order List</h1>
      <OrderList orders={orders} />
      <SelectedOrderList orders={orders} />
    </div>
  );
};

export default RestaurantOrders;