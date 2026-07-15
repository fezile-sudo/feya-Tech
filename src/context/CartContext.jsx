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




  const addToCart = (product) => {

    setCart((currentCart) => {

      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );


      if (existingProduct) {
         return currentCart.map((item) =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1 } : item );
      }
      return [...currentCart, {...product, quantity: 1}];

    });

  };

  const removeFromCart = (id) => {
      setCart((currentCart) =>
      currentCart.filter((item) => 
        item.id !== id) );
   };


  const increaseQuantity = (id) => {
      setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item) );

  };

  const decreaseQuantity = (id) => {
      setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1 }: item) );

  };


  return (

    <CartContext.Provider

      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
      }}

    >

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () => {

  return useContext(CartContext);

};