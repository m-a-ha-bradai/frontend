import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';

const Card = ({ imageart, reference, designation, prix }) => {
  const { addItem } = useShoppingCart();

  const addToCart = (product) => {
    const target = {
      id: product._id,         // ici _id est product._id
      title: product.designation,
      image: product.imageart,
      price: product.prix,
      qtestock: product.qtestock,
      quantity: 1,
    };
    addItem(target);
    console.log('Item added to cart:', target);
  };

  return (
    <div className="card">
      {imageart && <img src={imageart} alt={reference} />}
      <div className="card-content">
        <h1 className="card-title">{reference}</h1>
        <p className="card-description">{designation.substr(0, 20)}</p>
        <h1 className="card-title">Prix : {prix} TND</h1>
        <button
          className="card-button"
          onClick={() =>
            addToCart({
              _id: reference,     // ici on utilise 'reference' comme id
              designation,
              imageart,
              prix,
              qtestock: 0,       // valeur par défaut
            })
          }
        >
          <i className="fa-solid fa-basket-shopping"></i> Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
