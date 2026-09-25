import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  Button
} from "reactstrap";

import { useCart } from "../context/CartContext";

// Product images
import AppleM from "../assets/images/Apple Magic keyboard.webp";
import LenovoUSBC from "../assets/images/Lenovo USB-C.webp";
import LogitechBrio from "../assets/images/Logitech Brio.webp";


function Cart() {

  const {
    cart,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();


  const vat = cartTotal * 0.15;

  const shipping = cartTotal > 0 ? 0 : 0;

  const grandTotal = cartTotal + vat + shipping;


  // Match the filename stored in PostgreSQL
  // with the actual imported image
  const imageMap = {

    "Apple Magic keyboard.webp": AppleM,

    "Lenovo USB-C.webp": LenovoUSBC,

    "Logitech Brio.webp": LogitechBrio

  };


  return (

    <Container className="py-5">

      <h2 className="mb-4">
        Shopping Cart
      </h2>


      {cart.length === 0 ? (

        <Card className="shadow-sm">

          <CardBody className="text-center">

            <h4>
              Your cart is empty
            </h4>

            <Button color="dark" tag={Link} to="/" className="mt-3">
              Shopping
            </Button>

          </CardBody>

        </Card>

      ) : (

        <Row>

          <Col lg="8">

            {cart.map((item) => {

              const productImage = imageMap[item.image_url];


              return (

                <Card className="mb-3 shadow-sm" key={item.id}>

                  <Row className="g-0 align-items-center">

                    <Col md="4">

                      {productImage ? (

                        <CardImg
                          src={productImage}
                          alt={item.title}
                          style={{
                            height: "180px",
                            objectFit: "contain",
                            padding: "15px"
                          }}
                        />

                      ) : (

                        <div
                          className="d-flex align-items-center justify-content-center text-muted"
                          style={{
                            height: "180px"
                          }}
                        >
                          Image unavailable
                        </div>

                      )}

                    </Col>


                    <Col md="8">

                      <CardBody>

                        <h4>
                          {item.title}
                        </h4>


                        <p>
                          Price:{" "}
                          <strong>
                            R{item.price}
                          </strong>
                        </p>


                        <p>
                          Subtotal:{" "}
                          <strong>
                            R
                            {(item.price * item.quantity).toFixed(2)}
                          </strong>
                        </p>


                        <div className="d-flex align-items-center gap-2">

                          <Button color="secondary" onClick={() => decreaseQuantity(item.id)}>
                            -
                          </Button>


                          <span className="fw-bold">
                            {item.quantity}
                          </span>


                          <Button color="secondary" onClick={() => increaseQuantity(item.id)}>
                            +
                          </Button>


                          <Button color="danger" onClick={() => removeFromCart(item.id)}>
                            Remove
                          </Button>

                        </div>

                      </CardBody>

                    </Col>

                  </Row>

                </Card>

              );

            })}

          </Col>


          <Col lg="4">

            <Card className="shadow">

              <CardBody>

                <h3>
                  Order Summary
                </h3>

                <hr />


                <p>
                  Subtotal
                  <span className="float-end">
                    R{cartTotal.toFixed(2)}
                  </span>
                </p>


                <p>
                  Shipping
                  <span className="float-end text-success">
                    Free
                  </span>
                </p>


                <p>
                  VAT (15%)
                  <span className="float-end">
                    R{vat.toFixed(2)}
                  </span>
                </p>


                <hr />


                <h4>
                  Total
                  <span className="float-end">
                    R{grandTotal.toFixed(2)}
                  </span>
                </h4>


                <Button color="success" size="lg" block tag={Link} to="/checkout" className="mt-4">
                  Proceed to Checkout
                </Button>

              </CardBody>

            </Card>

          </Col>

        </Row>

      )}

    </Container>

  );

}


export default Cart;