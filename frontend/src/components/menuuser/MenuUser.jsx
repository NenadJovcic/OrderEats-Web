import React, { useState } from 'react';
import foods from './foods';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../styles/menuuser.css';

export function MenuUser() {
  const [orderbox, setOrderbox] = useState([]);

  function addToOrder(id) {
    if (orderbox.some((artikel) => artikel.id === id)) {
      alert('Food item is already in orderbox!');
    } else {
      const artikel = foods.find((food) => food.id === id);
      setOrderbox([...orderbox, { ...artikel, quantity: 1 }]);
    }
  }

  function changeNumber(action, id) {
    const newOrderbox = orderbox.map((item) => {
      let quantity = item.quantity;

      if (item.id === id) {
        if (action === 'minus') {
          quantity--;
          if (quantity === 0) {
            // Remove item from orderbox if quantity is 0
            return undefined;
          }
        } else if (action === 'plus') {
          quantity++;
        }
      }

      return {
        ...item,
        quantity,
      };
    }).filter(item => item !== undefined);

    setOrderbox(newOrderbox);
  }

  function subTotal() {
    let totalPrice = 0, totalQuantity = 0;
    orderbox.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });
    return { totalPrice, totalQuantity };
  }

  return (
    <>
      <div className='container'>
        <div className='left_side'>
          {foods.map((food) => {
            return (
              <div className='meny' key={food.id}>
                <div className='artikel-container'>
                  <div className='artikel-img'>
                    <img className='images' src={food.img} alt={food.name} />
                  </div>
                  <div className='info'>
                    <h2>{food.name}</h2>
                    <h2>
                      <small>-:</small>
                      {food.price}
                    </h2>
                    <div className='addToOrder' onClick={() => addToOrder(food.id)}>
                      <FontAwesomeIcon icon={faPlus} className='icon' alt='add to order' />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='right_side'>
          <div className='orderbox'>
            {orderbox.map((item) => (
              <div className='orderitem' key={item.id}>
                <div className='orderitem-img'>
                  <img className='images' src={item.img} alt={item.name} />
                </div>
                <div className='orderitem-name'>{item.name}</div>
                <div className='orderitem-quantity'>Antal {item.quantity}</div>
                <div className='numberBtn' onClick={() => changeNumber('minus', item.id)}>-</div>
                <div className='orderitem-price'>Pris {item.price} kr</div>
                <div className='numberBtn' onClick={() => changeNumber('plus', item.id)}>+</div>
              </div>
            ))}
          </div>
          <div className='totalprice'>
            <div className='subTotal'>Subtotal:</div>
            <div className='orderitem-price'>Antal: {subTotal().totalQuantity}</div>
            <div className='orderitem-price'>Pris: {subTotal().totalPrice} kr</div>
          </div>
          <button className='orderbutton'>Checkout Order</button>
        </div>
      </div>
    </>
  );
};