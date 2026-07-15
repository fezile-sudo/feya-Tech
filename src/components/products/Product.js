import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import ProductCard from "./ProductCard";
import products from "./productData";

import "./product.css";

function Product() {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll
    ? products
    : products.slice(0, 8);

  return (
    <section className="products-section py-5">

      <Container>

        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">
            My Products
          </h1>
        </div>

        <Row>
          {displayedProducts.map((product) => (
            <Col lg="3"  md="6" sm="12"  className="mb-4" key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

        {products.length > 7 && (
          <div className="text-center mt-4">
            <Button color="primary" size="lg" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}

      </Container>

    </section>
  );
}

export default Product;