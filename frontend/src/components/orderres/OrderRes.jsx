import React, { useState } from "react";
import "../../styles/orderres.css";
import jwt_decode from "jwt-decode";

const RestaurantOrders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const orderList = [
    {
      id: 1,
      products: ["Pizza", "Burger", " Pasta"],
      type: "Italian",
      price: 12.99
    },
    {
      id: 2,
      products: ["Burger", "Pizza"],
      type: "American",
      price: 8.99
    },
    {
      id: 3,
      products: ["Sushi", "Vasabi"],
      type: "Japanese",
      price: 15.99
    },
    {
      id: 4,
      products: ["Tacos", " Cola"],
      type: "Mexican",
      price: 10.99
    }
  ];

  const Order = ({ products, type, price, id }) => (
    <div className="order">
      <input
        type="checkbox"
        checked={selectedOrders.includes(id)}
        onChange={() =>
          selectedOrders.includes(id)
            ? setSelectedOrders(selectedOrders.filter(orderId => orderId !== id))
            : setSelectedOrders([...selectedOrders, id])
        }
      />
      <h3>{products}</h3>
      <p>{type}</p>
      <p>{`$${price.toFixed(2)}`}</p>
    </div>
  );

  const OrderList = ({ orders }) => (
    <div className="order-list">
      {orders.map(({ id, ...rest }) => (
        <Order key={id} id={id} {...rest} />
      ))}
    </div>
  );

  const SelectedOrderList = ({ orders }) => (
    <div>
      <h1>Waiting orders to collect:</h1>
      {orders.map(({ id, products, type, price }) => {
        if (selectedOrders.includes(id)) {
          return (
            <div key={id}>
              <h3>{products}</h3>
              <p>{type}</p>
              <p>{`$${price.toFixed(2)}`}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
  return (
    <div className="App">
      <h1>Income Order List</h1>
      <OrderList orders={orderList} />
      <SelectedOrderList orders={orderList} />
    </div>
  );
};

export default RestaurantOrders;