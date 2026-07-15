import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {

    setCart((currentCart) => {

      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity
              }
            : item
        );

      }

      return [
        ...currentCart,
        {
          ...product,
          quantity
        }
      ];

    });

  };

  // Remove product
  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );

  };

  // Increase quantity
  const increaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };

  // Decrease quantity
  const decreaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
    );

  };

  // Clear cart after successful checkout
  const clearCart = () => {
    setCart([]);
  };

  // Cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal
      }}
    >

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () => {

  return useContext(CartContext);

};