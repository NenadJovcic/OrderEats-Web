import React, { useEffect, useState } from "react";
import "../../styles/orderres.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const RestaurantOrders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:3333/orders/ready").then((res) => {
        setSelectedOrders(res.data.orders);
      });
      await axios.get("http://localhost:3333/orders/unready").then((res) => {
        setOrders(res.data.orders);
      });
    };
    fetchData();
  }, [update]);

  async function handleCheckboxClick(id, ready) {
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: { auth_token: token },
    };
    await axios
      .put(
        `http://localhost:3333/orders/${id}`,
        {
          ready: !ready,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (update === id) {
      setUpdate(1);
    } else {
      setUpdate(id);
    }
  }

  async function handleAccepted(id, accepted) {
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: { auth_token: token },
    };
    await axios
      .put(
        `http://localhost:3333/orders/${id}`,
        {
          accepted: !accepted,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (update === id) {
      setUpdate(1);
    } else {
      setUpdate(id);
    }
  }

  async function handleDeleteOrder(id) {
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: { auth_token: token },
    };
    await axios
      .delete(`http://localhost:3333/orders/delete/${id}`, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (update === id) {
      setUpdate(1);
    } else {
      setUpdate(id);
    }
  }

  const Order = ({ items, user, accepted, _id, ready }) => {
    return (
      <div className="order" key={_id}>
        {!accepted && !ready ? (
          <>
            <h3>Accept?</h3>
            <button
              onClick={() => {
                handleAccepted(_id, ready);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                handleDeleteOrder(_id);
              }}
            >
              NOOO!!
            </button>
          </>
        ) : (
          <input
            type="checkbox"
            checked={ready}
            onChange={() => handleCheckboxClick(_id, ready)}
          />
        )}

        {items &&
          items.map((item, index) => {
            const sum = items.reduce(
              (accumulator, currentValue) => accumulator + currentValue.price,
              0
            );
            return (
              <>
                <h3 key={index}>{item.name}</h3>
                {index === items.length - 1 ? <div>Total: {sum}</div> : null}
              </>
            );
          })}
        <p>{user.userName}</p>
        {ready ? (
          <button
            onClick={() => {
              handleDeleteOrder(_id, ready);
            }}
          >
            Customer Picked it Up
          </button>
        ) : null}
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
    if (selectedOrders.length === 0) {
      return <p>There are no ready orders yet.</p>;
    }
    return (
      <>
        <h1 className="title-orders">Waiting orders to collect by drivers:</h1>
        <div className="order-list">
          {selectedOrders.map(({ _id, ready, ...rest }) => (
            <Order {...rest} _id={_id} ready={ready} key={_id} />
          ))}
        </div>
      </>
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
