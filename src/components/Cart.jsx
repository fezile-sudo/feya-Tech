import React from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Card,
  CardBody,
  CardImg,
  Button,
  Row,
  Col
} from "reactstrap";

import { useCart } from "../context/CartContext";

function Cart() {

  const {
    cart,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  return (

    <Container className="py-5">

      <h2 className="mb-4">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (

        <h4>Your cart is empty</h4>

      ) : (

        <>

          {cart.map((item) => (

            <Card
              className="mb-3 shadow-sm"
              key={item.id}
            >

              <Row className="g-0">

                <Col md="3">

                  <CardImg
                    src={item.image}
                    alt={item.title}
                    style={{
                      height: "150px",
                      objectFit: "cover"
                    }}
                  />

                </Col>

                <Col md="9">

                  <CardBody>

                    <h4>{item.title}</h4>

                    <p>
                      Price: R{item.price}
                    </p>

                    <p>
                      Subtotal: R{item.price * item.quantity}
                    </p>

                    <div className="d-flex align-items-center gap-2">

                      <Button
                        color="secondary"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        -
                      </Button>

                      <span>
                        {item.quantity}
                      </span>

                      <Button
                        color="secondary"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </Button>

                      <Button
                        color="danger"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </Button>

                    </div>

                  </CardBody>

                </Col>

              </Row>

            </Card>

          ))}

          <hr />

          <h3>
            Total: <strong>R{cartTotal.toFixed(2)}</strong>
          </h3>

          <div className="mt-4">

            <Button
              color="success"
              size="lg"
              tag={Link}
              to="/checkout"
            >
              Proceed to Checkout
            </Button>

          </div>

        </>

      )}

    </Container>

  );

}

export default Cart;