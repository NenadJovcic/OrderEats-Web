import React, { useState } from "react";
import "../../styles/menuadmin.css";

const MenuAdmin = () => {
  const [menu, setMenu] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26,
  ]);
  const [currentItem, setCurrentItem] = useState(null);

  function handleMenuItem(item) {
    setCurrentItem(item);
  }

  return (
    <>
      <div className="menuadmin-area">
        <div className="menuadmin-menu">
          {menu.map((item) => {
            return (
              <div
                key={item}
                onClick={() => {
                  handleMenuItem(item);
                }}
                className="menuadmin-menu-item"
                style={{
                  outline: currentItem === item ? "3px solid #015513" : null,
                }}
              >
                <img
                  className="menuadmin-menu-item-image"
                  src="https://healthix.org/wp-content/uploads/2016/06/testimage.jpeg"
                  alt="test"
                />
                <div>
                  <h3>Name: {item}</h3>
                  <h4>Price: Free!</h4>
                </div>
              </div>
            );
          })}
        </div>
        <div className="menuadmin-editor">
          <div>
            <label htmlFor="menuadmin-editor-image">Image-src</label>
            <input id="menuadmin-editor-image" placeholder={currentItem} />
            <label htmlFor="menuadmin-editor-name">Name</label>
            <input id="menuadmin-editor-name" placeholder={currentItem} />
            <label htmlFor="menuadmin-editor-price">Price</label>
            <input id="menuadmin-editor-price" placeholder={currentItem} />
          </div>
          <div className="menuadmin-editor-buttons">
            <div className="menuadmin-editor-button">Put</div>
            <div className="menuadmin-editor-button">Post</div>
            <div className="menuadmin-editor-button">Delete</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuAdmin;
