import React, { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { Link } from 'react-router-dom';
//
import axios from "../Api/axios";
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const { cartDetails, removeItem, clearCart, totalPrice, cartCount, incrementItem, decrementItem } = useShoppingCart();
  //
  const [status, setStatus] = useState("idle");

  // Fonction pour gérer le paiement Stripe
  async function handleClickStripe(event) {
    event.preventDefault();
    if (cartCount > 0) {
      setStatus("loading");
      try {
        const stripe = await loadStripe('pk_test_51RiKA4Pu8MU934fYNBziL4tGAFU4Oh6KPzH885fISvyuAHVnSWSMskxWB9h23Q5jsIRNkNHlZaJzgH5RDr0be6c600egRMr4FU');
        if (!stripe) throw new Error('Stripe failed to initialize.');
        const checkoutResponse = await axios.post('payment', { cartDetails });
        const { sessionId } = await checkoutResponse.data;
        const stripeError = await stripe.redirectToCheckout({ sessionId });
        if (stripeError) {
          console.error(stripeError);
        }
      } catch (error) {
        console.error(error);
        setStatus("redirect-error");
      }
    } else {
      setStatus("no-items");
    }
  }

    //Stripe


  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartCount === 0 ? (
        <div className="cart-empty">
          <p>Panier Vide</p>
          <div className="start-shopping">
            <Link to="/client">
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>

          {/*  produits dans le panier */}
          <div className="cart-items">
            {cartDetails && Object.values(cartDetails).map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={`${cartItem.image}`} alt={cartItem.title} />
                  <div>
                    <h3>{cartItem.title}</h3>
                    <button onClick={() => removeItem(cartItem.id)}>
                      <i className="fa-solid fa-trash-can" style={{ fontSize: "14px", color: "red" }}></i>
                    </button>
                  </div>
                </div>
                <div className="cart-product-price"> {cartItem.price} TND</div>
                <div className="cart-product-quantity">
                  <button className="button-actions" onClick={() => decrementItem(cartItem.id)}>-</button>
                  <div className="count">{cartItem.quantity}</div>
                  <button className="button-actions" onClick={() => incrementItem(cartItem.id)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  {cartItem.quantity * cartItem.price} TND
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <button className="clear-btn" onClick={() => clearCart()}>Clear Cart</button>

            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">{totalPrice} TND</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              
              {/* paiement  */}
              <button onClick={(event) => handleClickStripe(event)}>
                {status !== "loading" ? "Check Out" : "Loading..."}
              </button>

              <div className="continue-shopping">
                <Link to="/articlescard">
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
