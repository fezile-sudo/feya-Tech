import React from "react";

import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button
} from "reactstrap";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import AppleM from "../../assets/images/Apple Magic keyboard.webp";
import LenovoUSBC from "../../assets/images/Lenovo USB-C.webp";
import LogitechBrio from "../../assets/images/Logitech Brio.webp";



function ProductCard({ product }) {

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useWishlist();


  // Match the filename stored in PostgreSQL
  // with the actual image imported from src/assets/images
  const imageMap = {

  "Apple Magic keyboard.webp": AppleM,

  "Lenovo USB-C.webp": LenovoUSBC,

  "Logitech Brio.webp": LogitechBrio

};



  const productImage = imageMap[product.image_url];


  const liked = isInWishlist(product.id);


  const handleWishlist = () => {

    if (liked) {

      removeFromWishlist(product.id);

    } else {

      addToWishlist(product);

    }

  };


  return (

    <Card className="product-card h-100 shadow-sm">

      <div className="image-wrapper">

        {productImage ? (

          <CardImg top src={productImage} alt={product.title} className="product-image"/>

        ) : (

          <div
            className="d-flex align-items-center justify-content-center text-muted"
            style={{
              height: "200px"
            }}
          >
            Image unavailable
          </div>

        )}

      </div>


      <Button color={liked ? "danger" : "light"} className="mb-2" onClick={handleWishlist}>

        {liked
          ? "♥ Remove Wishlist"
          : "♡ Add Wishlist"
        }

      </Button>


      <Button color="dark" className="add-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </Button>


      <CardBody className="d-flex flex-column">

        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">

          <CardTitle tag="h4" className="fw-bold mb-3">
            {product.title}
          </CardTitle>

        </Link>


        <CardText className="text-muted">

          <strong>R</strong>
          {product.price}

        </CardText>

      </CardBody>

    </Card>

  );

}


export default ProductCard;

