import React from 'react'
import foods from './foods.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/menuuser.css"

// Select foods


//show foods
export function MenuUser() {
  return(
    <>
    {foods.map((food) => {
  return (
    <div className="meny">
      <div className="artikel-container">
        <div className="artikel-img">
          <img className="images" src={food.img} alt={food.name}/>
        </div>
        <div className="info">
          <h2>{food.name}</h2>
          <h2><small>-:</small>{food.price}</h2>
          <div className="add-to-orderlist" >
            <FontAwesomeIcon icon={faPlus} className="icon" alt="add to order" />
          </div>
        </div>
      </div>
    </div>
  );
})}
      </>
  )}

/*
//order Array
let orderbox = [];

// Add to Order
function addToOrder(id) {
  if (orderbox.some((artikel) => artikel.id === id)) {
    alert("Food item is already in orderbox!");
  } else {
    const artikel = foods.find((food) => food.id === id);
    orderbox.push({
      ...artikel,
      numberofArtikels: 1
    });
  }
  updateorderbox();
};

// show food artikels
function showOrderArtikels() {
  orderboxartikel.innerHTML = ""; //remove food artikel
  orderbox.map((artikel) => {
      <div className="orderbox-artikels">
        <div className="artikel-info">
          <div className="artikel-img">
            <img src={artikel.imgsrc} alt={artikel.name}></img>
            <h4>${artikel.name}</h4>
          </div>
          <div className="food-price">
            <small>-:</small>${artikel.price}
          </div>
          <div className="button">
            <div className="btn minus" >-</div>
            <div className="number">${artikel.numberOfItems}</div>
            <div className="btn minus" >+</div>
          </div>
        </div>
      </div>
  });
};
  //update orderbox
function updateorderbox() {
  showOrderartikels();
  //showTotalartikels();
};

// change number of food artikel
function changeNumberOfItems(id) {
  orderbox = orderbox.map((artikel) => {

    let oldNumber = artikel.numberOfItems;

    if(artikel.id === id){

    }
    return artikel;
  })
}




/*import { useStates, useAutoKeys } from "react-easier";
import foods from "./Foods.jsx";

export default function artikels () {
  useAutoKeys()
  const food = useStates('foods')
  const order = useStates('order')

  const add = (e, foods) => {
    order.items.push(food)
    order.total = order.total + food.price
  }

  return
  <div classNameName="food">
    <h2>{food.name}</h2>
    <button onClick={(e) => add(e, food)}>"Lägg till i order"</button> <span>{food.price}</span>
    <img>src={food.imgsrc}</img>
  </div> 

};*/