import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Badge
} from "reactstrap";

import { useCart } from "../context/CartContext";

import AppleM from "../assets/images/Apple Magic keyboard.webp";
import LenovoUSB from "../assets/images/Lenovo USB-C.webp";
import LogitechBrio from "../assets/images/Logitech Brio.webp";


function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);


  const imageMap = {
  "Apple Magic keyboard.webp": AppleM,
  "Lenovo USB-C.webp": LenovoUSB,
  "Logitech Brio.webp": LogitechBrio
};



  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );


        if (!response.ok) {

          if (response.status === 404) {
            throw new Error("Product not found");
          }

          throw new Error("Failed to fetch product");

        }


        const data = await response.json();

        setProduct(data);


      } catch (error) {

        console.error(
          "PRODUCT FETCH ERROR:",
          error
        );

        setError(error.message);


      } finally {

        setLoading(false);

      }

    };


    fetchProduct();

  }, [id]);


  const handleAddToCart = () => {

    addToCart(product, quantity);

    setAdded(true);

  };


  if (loading) {

    return (
      <h2 className="text-center mt-5">
        Loading product...
      </h2>
    );

  }


  if (error) {

    return (
      <h2 className="text-center mt-5">
        {error}
      </h2>
    );

  }


  if (!product) {

    return (
      <h2 className="text-center mt-5">
        Product not found
      </h2>
    );

  }


  const productImage = imageMap[product.image_url];


  return (

    <Container className="py-5">

      <Row className="align-items-center">

        <Col md="6">

          {productImage ? (

            <img src={productImage} alt={product.title} className="img-fluid rounded shadow"/>

          ) : (

            <div className="text-muted">
              Image unavailable
            </div>

          )}

        </Col>


        <Col md="6">

          <h1 className="fw-bold">
            {product.title}
          </h1>


          {product.category && (

            <Badge color="primary" className="mb-3">
              {product.category}
            </Badge>

          )}


          <h3 className="mb-3">
            R{product.price}
          </h3>


          {product.stock > 0 ? (

            <p className="text-success fw-bold">
              ✓ In Stock ({product.stock} available)
            </p>

          ) : (

            <p className="text-danger fw-bold">
              ✕ Out of Stock
            </p>

          )}


          <p className="text-muted">
            {product.description}
          </p>


          {product.stock > 0 && (

            <>

              <div className="d-flex align-items-center gap-3 mb-4">

                <Button
                  color="secondary"
                  onClick={() =>
                    setQuantity(
                      quantity > 1
                        ? quantity - 1
                        : 1
                    )
                  }
                >
                  -
                </Button>


                <span className="fs-4 fw-bold">
                  {quantity}
                </span>


                <Button
                  color="secondary"
                  onClick={() =>
                    setQuantity(
                      quantity < product.stock
                        ? quantity + 1
                        : quantity
                    )
                  }
                >
                  +
                </Button>

              </div>


              <Button color="dark" size="lg" onClick={handleAddToCart}>
                Add {quantity} to Cart
              </Button>

            </>

          )}


          {added && (

            <div className="mt-4">

              <p className="text-success fw-bold">
                ✓ Added to cart
              </p>


              <div className="d-flex gap-3">

                <Button color="outline-dark" tag={Link} to="/" >
                  Continue Shopping
                </Button>


                <Button color="success" tag={Link} to="/cart" >
                  View Cart
                </Button>

              </div>

            </div>

          )}

        </Col>

      </Row>

    </Container>

  );

}


export default ProductDetails;

