import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
  <Card className="product-card h-100 shadow-sm">

  <div className="image-wrapper">

    <CardImg top src={product.image} alt={product.title} className="product-image"/>

  </div>

  <Button color="dark" className="add-cart-btn"
    onClick={() => addToCart(product)}>
    Add to Cart
  </Button>

  <CardBody className="d-flex flex-column">
    
  <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">

  <CardTitle tag="h4" className="fw-bold mb-3">
    {product.title}
  </CardTitle>

  </Link>

    <CardText className="text-muted">
      <strong>R</strong>{product.price}
    </CardText>
  </CardBody>

</Card>
  );
}

export default ProductCard;