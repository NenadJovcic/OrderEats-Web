import React, { useState } from 'react';
import axios from 'axios';

const NewOrderForm = () => {
  const [items, setItems] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { items, createdAt };
    const authToken = localStorage.getItem('auth-token')
    const config = {
      headers: {
        'auth-token': authToken
      }
    };

    try {
      const response = await axios.post('http://localhost:3333/orders', data, config);

      console.log(response);
      alert('Order created successfully');
    } catch (error) {
      console.error(error);
      alert('There was an error creating the order');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Items:
        <input type="text" value={items} onChange={(e) => setItems(e.target.value)} />
      </label>
      <br />
      <label>
        Created At:
        <input type="text" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Order</button>
    </form>
  );
};

export default NewOrderForm;
