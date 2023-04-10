import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/menuadmin.css";

const MenuAdmin = () => {
  const [menu, setMenu] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [newItem, setNewItem] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3333/menu").then((res) => {
      setMenu(res.data);
    });
  });

  function handleMenuItem(item) {
    setCurrentItem(item);
    setNewItem(item);
  }

  async function handlePost() {
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: { auth_token: token },
    };
    await axios
      .post(
        "http://localhost:3333/menu",
        {
          name: newItem.name,
          price: newItem.price,
          photo: newItem.photo,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handlePut() {
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: { auth_token: token },
    };
    await axios
      .put(
        `http://localhost:3333/menu/${currentItem._id}`,
        {
          name: newItem.name,
          price: newItem.price,
          photo: newItem.photo,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleDelete() {
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: { auth_token: token },
    };
    await axios
      .delete(`http://localhost:3333/menu/${currentItem._id}`, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="menuadmin-area">
        <div className="menuadmin-menu">
          {menu
            ? menu.map((item) => {
                return (
                  <div
                    key={item._id}
                    onClick={() => {
                      handleMenuItem(item);
                    }}
                    className="menuadmin-menu-item"
                    style={{
                      outline:
                        currentItem._id === item._id
                          ? "3px solid #015513"
                          : null,
                    }}
                  >
                    <img
                      className="menuadmin-menu-item-image"
                      src={item.photo}
                      alt="test"
                    />
                    <div>
                      <h3>Name: {item.name}</h3>
                      <h4>Price: {item.price}</h4>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="menuadmin-editor-column">
          <div className="menuadmin-editor-row">
            <div className="menuadmin-editor">
              <div>
                <label htmlFor="menuadmin-editor-image-old">
                  Current Image-src
                </label>
                <input
                  id="menuadmin-editor-image-old"
                  value={currentItem ? currentItem.photo : null}
                />
                <label htmlFor="menuadmin-editor-name-old">Current Name</label>
                <input
                  id="menuadmin-editor-name-old"
                  value={currentItem ? currentItem.name : null}
                />
                <label htmlFor="menuadmin-editor-price-old">
                  Current Price
                </label>
                <input
                  id="menuadmin-editor-price-old"
                  value={currentItem ? currentItem.price : null}
                />
              </div>
            </div>
            <div className="menuadmin-editor">
              <div>
                <label htmlFor="menuadmin-editor-image">Image-src</label>
                <input
                  id="menuadmin-editor-image"
                  placeholder={newItem ? newItem.photo : null}
                  onChange={(e) => {
                    setNewItem({ ...newItem, photo: e.target.value });
                  }}
                />
                <label htmlFor="menuadmin-editor-name">Name</label>
                <input
                  id="menuadmin-editor-name"
                  placeholder={newItem ? newItem.name : null}
                  onChange={(e) => {
                    setNewItem({ ...newItem, name: e.target.value });
                  }}
                />
                <label htmlFor="menuadmin-editor-price">Price</label>
                <input
                  id="menuadmin-editor-price"
                  placeholder={newItem ? newItem.price : null}
                  onChange={(e) => {
                    setNewItem({ ...newItem, price: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="menuadmin-editor-buttons">
            <div
              onClick={() => {
                handlePut();
              }}
              className="menuadmin-editor-button"
            >
              Put
            </div>
            <div
              onClick={() => {
                handlePost();
              }}
              className="menuadmin-editor-button"
            >
              Post
            </div>
            <div
              onClick={() => {
                handleDelete();
              }}
              className="menuadmin-editor-button"
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuAdmin;
