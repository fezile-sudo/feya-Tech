import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


const WishlistContext = createContext();



export const WishlistProvider = ({ children }) => {


  const [wishlist, setWishlist] = useState(() => {

    const savedWishlist = localStorage.getItem("wishlist");

      return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

  });





  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist) );
     }, [wishlist]);





  const addToWishlist = (product) => {


    setWishlist((currentWishlist) => {


  const exists = currentWishlist.find(item => item.id === product.id);

  if (exists) {

        return currentWishlist;

      }


    return [...currentWishlist, product];

    });


  };


const removeFromWishlist = (id) => {


    setWishlist((currentWishlist) =>

      currentWishlist.filter(

        item => item.id !== id

      )
    );

  };



const isInWishlist = (id) => {
      return wishlist.some(

      item => item.id === id
    );
};



return (

    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist}} >

      {children}

    </WishlistContext.Provider>

  );

};


export const useWishlist = () => {

  return useContext(WishlistContext);

};