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

  const handleCheckboxClick = (_id, ready) => {
    if (selectedOrders.includes(_id)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== _id));
    } else {
      setSelectedOrders([...selectedOrders, _id]);
    }

    const updatedOrders = orders.map((order) =>
      order._id === _id ? { ...order, ready: !ready } : order
    );
    setOrders(updatedOrders);
  };

  const Order = ({ items, user, total, _id, ready }) => {
    console.log(items)
    return (
      <div className="order" key={_id}>
        <input
          type="checkbox"
          checked={selectedOrders.includes(_id)}
          onChange={() => handleCheckboxClick(_id, ready)}
        />
        {items && items.map((item, index) => {

          const sum = items.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
          return (<>
            <h3 key={index}>{item.name}</h3>
            {index === items.length - 1 ? <div>Total: {sum}</div> : null}
          </>
          )
        })}
        <p>{user.userName}</p>

      </div>
    );
  };

  const OrderList = ({ orders }) => (
    <div className="order-list">
      {orders.map(({ _id, ready, ...rest }) =>
        !ready ? <Order {...rest} _id={_id} ready={ready} key={_id} /> : null
      )}
    </div>
  );

  const SelectedOrderList = ({ orders }) => {
    const readyOrders = orders.filter((order) => order.ready);
    if (readyOrders.length === 0) {
      return <p>There are no ready orders yet.</p>;
    }
    return (
      <div className="selected-order-list">
        <h1 className="title-orders">Waiting orders to collect by drivers:</h1>
        {readyOrders.map(({ _id, ready, ...rest }) => (
          <Order {...rest} _id={_id} ready={ready} key={_id} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="title-orders">Income Order List</h1>
      <OrderList orders={orders} />
      <SelectedOrderList orders={orders} />
    </div>
  );
};

export default RestaurantOrders;
