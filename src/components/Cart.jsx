import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>
              Quantity: {item.quantity}
            </p>
            <p>
              Price: R{item.price}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;