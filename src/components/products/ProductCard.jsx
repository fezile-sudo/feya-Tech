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
import Gaming from "../../assets/images/Gaming_.jpg";
import LogitechBrio from "../../assets/images/Logitech Brio.webp";

import Genius  from "../../assets/images/Genius KM-8101 2.4Ghz.jpg";
import Xceed  from "../../assets/images/Xceed Byte Black Wired.webp";
import Wolf  from "../../assets/images/T-Wolf T30.jpg";
import Dell  from "../../assets/images/Dell KM3322W.webp";

import Volkano  from "../../assets/images/Volkano Slick Series.jpg";
import Keychron from "../../assets/images/Keychron G3.webp";
import Xiaomi  from "../../assets/images/Xiaomi Dual.webp";

import JBL  from "../../assets/images/JBL T720.webp";
import GC  from "../../assets/images/GC Gaming.webp";
import Redragon  from "../../assets/images/Redragon.webp";
import B39  from "../../assets/images/B39 Bluetooth.webp";

function ProductCard({ product }) {

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useWishlist();


  const imageMap = {

  "Apple Magic keyboard.webp": AppleM,

  "Gaming_.jpg": Gaming,

  "Logitech Brio.webp": LogitechBrio,
  "Genius KM-8101 2.4Ghz.jpg": Genius,
  "Xceed Byte Black Wired.webp": Xceed,
  "T-Wolf T30.jpg": Wolf,
  "Dell KM3322W.webp": Dell,
  "Volkano Slick Series.jpg": Volkano,
  "Keychron G3.webp":Keychron, 
  "Xiaomi Dual.webp": Xiaomi,
  "JBL T720.webp": JBL,
  "GC Gaming.webp": GC,
  "Redragon.webp": Redragon,
  "B39 Bluetooth.webp": B39

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

