import React, { useState, useEffect } from "react";
import axios from "axios";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/menuuser.css";

export function MenuUser() {
  const [menu, setMenu] = useState([]);
  const [orderbox, setOrderbox] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      axios.get("http://localhost:3333/menu").then((res) => {
        setMenu(res.data);
      });
    };
    fetchdata();
  }, []);

  // add item to orderbox
  function addToOrder(id) {
    if (orderbox.some((artikel) => artikel._id === id)) {
      return;
    } else {
      const artikel = menu.find((food) => food._id === id);
      setOrderbox([...orderbox, { ...artikel, quantity: 1 }]);
    }
  }

  // add or subtracts number quantity for an item with "-" or "+" in the orderbox, with map method
  function changeNumber(action, id) {
    const newOrderbox = orderbox
      .map((item) => {
        let quantity = item.quantity;

        if (item._id === id) {
          if (action === "minus") {
            quantity--;
            if (quantity === 0) {
              return undefined;
            }
          } else if (action === "plus") {
            quantity++;
          }
        }

        return {
          ...item,
          quantity: quantity,
        };
      })
      .filter((item) => item !== undefined);

    setOrderbox(newOrderbox);
  }

  // remove completly item from orderbox with "x" via filter method
  function removeBtn(id) {
    let newOrderbox = orderbox.filter((item) => item._id !== id);
    setOrderbox(newOrderbox);
  }

  // shows total amount of items and the following total price in the orerbox, with forEach method
  function total() {
    let totalPrice = 0,
      totalQuantity = 0;
    orderbox.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });
    return { totalPrice, totalQuantity };
  }

  async function postOrder() {
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: { auth_token: token },
    };
    const user = JSON.parse(localStorage.getItem("user"));
    const items = orderbox.flatMap((obj) => {
      return Array(obj.quantity).fill(obj);
    });
    console.log(items);

    await axios
      .post(
        "http://localhost:3333/orders",
        {
          user: user._id,
          items: items,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        location.assign("/orderuser");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container">
        <div className="left_side">
          {menu.map((food) => {
            return (
              <div className="meny" key={food._id}>
                <div className="artikel-container">
                  <div className="artikel-img">
                    <img className="images" src={food.photo} alt={food.name} />
                  </div>
                  <div onClick={() => addToOrder(food._id)} className="info">
                    <h2>{food.name}</h2>
                    <h2>
                      {food.price}
                      <small> :-</small>
                    </h2>
                    <div
                      className="addToOrder"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="right_side">
          <div className="orderbox">
            {orderbox.map((item) => (
              <div className="orderitem" key={item._id}>
                <div className="orderitem-img">
                  <img className="images" src={item.photo} alt={item.name} />
                </div>
                <div className="orderitem-name">{item.name}</div>

                <div className="orderitem-quantity">Total {item.quantity}</div>
                <div
                  className="numberBtn"
                  onClick={() => changeNumber("minus", item._id)}
                >
                  -
                </div>

                <div className="orderitem-price">Price {item.price} $</div>
                <div
                  className="numberBtn"
                  onClick={() => changeNumber("plus", item._id)}
                >
                  +
                </div>
                <div className="removeBtn" onClick={() => removeBtn(item._id)}>
                  x
                </div>
              </div>
            ))}
          </div>
          <div className="totalprice">
            <div className="total">Summary:</div>
            <div className="orderitem-price">
              Quantity: {total().totalQuantity}
            </div>
            <div className="orderitem-price">Price: {total().totalPrice} $</div>
          </div>
          <button
            disabled={!localStorage.hasOwnProperty("user")}
            className="orderbutton"
            onClick={() => {
              postOrder();
            }}
          >
            {!localStorage.hasOwnProperty("user")
              ? "You have to log in to order!"
              : "Checkout Order"}
          </button>
        </div>
      </div>
    </>
  );
}

export default MenuUser;

/*
  <FontAwesomeIcon
                        icon={faPlus}
                        className="icon"
                        alt="add to order"
                      />
                      */
