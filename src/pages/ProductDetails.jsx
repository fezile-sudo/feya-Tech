import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

import products from "../components/products/productData";
import { useCart } from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <h2>Product not found</h2>
    );
  }

  const handleAddToCart = () => {

    addToCart(product, quantity);

  };

  return (

    <Container className="py-5">

      <Row className="align-items-center">

        <Col md="6">

          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
          />

        </Col>

        <Col md="6">

          <h1>{product.title}</h1>

          <h3>R{product.price}</h3>

          <p className="text-muted">
            {product.description}
          </p>

          <div className="d-flex align-items-center gap-3 mb-4">

            <Button
              color="secondary"
              onClick={() =>
                setQuantity(quantity > 1 ? quantity - 1 : 1)
              }
            >
              -
            </Button>

            <span className="fs-4">
              {quantity}
            </span>

            <Button
              color="secondary"
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </Button>

          </div>

          <Button
            color="dark"
            size="lg"
            onClick={handleAddToCart}
          >
            Add {quantity} to Cart
          </Button>

        </Col>

      </Row>

    </Container>

  );

}

export default ProductDetails;