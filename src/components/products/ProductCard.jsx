import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Badge,
  Button
} from "reactstrap";

function ProductCard({ product }) {
  return (
    <Card className="product-card h-100 shadow-sm">

      <CardImg top src={product.image} alt={product.title} className="product-image" />

      <CardBody className="d-flex flex-column">

        <CardTitle tag="h4" className="fw-bold mb-3">
          {product.title}
        </CardTitle>

        <CardText className="text-muted">
          <p><strong>R</strong>{product.price}</p>
          
        </CardText> 

        </CardBody>

    </Card>
  );
}

export default ProductCard;