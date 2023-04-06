import React, { useState } from 'react';
import axios from 'axios';
import MenuList from '../menuuser/MenuUser';

const NewOrderForm = () => {
  const [items, setItems] = useState([]);
  const [createdAt, setCreatedAt] = useState('');
  const [menu, setMenu] = useState(null)

  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { items };
    const authToken = localStorage.getItem('auth-token')
    const config = {
      headers: {
        'auth-token': authToken
      }
    };

    try {
      const response = await axios.post('http://localhost:3333/orders', data, config);

      console.log(response);

      const responseData = await response.data;
      if (responseData) {
        setError('')
      }
      console.log(responseData);
      // setItems([]);
      setMenu(responseData.data.items.join(', ')) // join items array with comma separator
      setCreatedAt(responseData.data.createdAt);

    } catch (err) {
      // Handle network errors
      const { error } = err.response.data

      setError(error);
    }
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, '']);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };



  return (
    <section>

      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index}>
            <label>
              Item #{index + 1}:
              <input style={{ width: '250px' }} type="text" value={item} onChange={(e) => handleItemChange(index, e.target.value)} />
            </label>
            {items.length > 1 && <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>}
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>Add Item</button>
        <button type="submit">Create Order</button>
        <div>{error}</div>
        <div> {menu} </div>
        <div> {createdAt} </div>
      </form>

      <div>
        <MenuList />
      </div>
    </section>
  );
};

export default NewOrderForm;
