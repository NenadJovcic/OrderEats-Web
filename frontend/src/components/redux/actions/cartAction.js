import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET } from "../constants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3333/menu/${id}`);
    
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            menu: data._id,
            name: data.name,
            photo: data.photo,
            price: data.price,
            qty
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// remove from cart
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// reset cart
export const resetCart = () => (dispatch) => {
    dispatch({
        type: CART_RESET
    });
    localStorage.removeItem('cartItems');
}




// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../redux/actions/cartAction';
// import { Link } from 'react-router-dom';
// import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

// const CartScreen = ({ match, location, history }) => {
//     const menuId = match.params.id;
//     const qty = location.search ? Number(location.search.split('=')[1]) : 1;
//     const dispatch = useDispatch();
//     const cart = useSelector(state => state.cart);
//     const { cartItems } = cart;
//     console.log(cartItems);

//     useEffect(() => {
//         if (menuId) {
//             dispatch(addToCart(menuId, qty));
//         }
//     }, [dispatch, menuId, qty]);

//     return (
//         <div>
//             <h1>Cart</h1>
//         </div>
//     )
// }

// export default CartScreen