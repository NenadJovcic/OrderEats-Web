import React, { useState, useEffect } from 'react';
import axios from 'axios';
const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await axios.get('http://localhost:3333/menu');
      setMenu(response.data);
    };
    fetchMenu();
  }, []);

  const handleMenuItemClick = (item) => {
    const selectedItemIndex = selectedItems.findIndex((selectedItem) => selectedItem._id === item._id);
    if (selectedItemIndex !== -1) {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[selectedItemIndex].quantity += 1;
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <>
      <div>
        <h2>Menu List</h2>
        <ul style={{ display: 'flex', marginTop: '20px' }}>
          {menu.slice(0, 2).map((item) => (
            <li key={item._id}>
              <img style={{ width: '50px' }} src={item.photo} onClick={() => handleMenuItemClick(item)} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
            </li>
          ))}
        </ul>
      </div>
      <aside style={{ marginLeft: '150px', border: 'solid black 1px' }}>
        <div>
          {selectedItems.map((selectedItem) => (
            <div key={selectedItem._id}>
              <h2>{selectedItem.name}</h2>
              <img src={selectedItem.photo} alt={selectedItem.name} style={{ width: '50px' }} />
              <p>{selectedItem.description}</p>
              <p>Price: {selectedItem.price}</p>
              <p>Quantity: {selectedItem.quantity}</p>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};





export default MenuList;
