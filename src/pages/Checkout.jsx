import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button, Alert } from "reactstrap";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentOptions from "../components/checkout/PaymentOptions";
import OrderSummary from "../components/checkout/OrderSummary";


const API_URL = "http://localhost:5000/api";


function Checkout() {

  const navigate = useNavigate();

  const { cart, cartTotal, clearCart } = useCart();

  const { user, token } = useAuth();


  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: ""

  });


  const [payment, setPayment] = useState("cod");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const shipping = 0;

  const vat = cartTotal * 0.15;
 


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // Make sure the user is logged in
    if (!user || !token) {

      setError("Please log in before placing an order.");

      return;

    }


    // Make sure all shipping fields are completed
    const emptyField = Object.values(formData).some(
      (field) => field.trim() === ""
    );


    if (emptyField) {

      setError("Please complete all shipping details.");

      return;

    }


    try {

      setLoading(true);


      // Prepare order data for the API
     const orderData = {

  customer_name: formData.name,

  customer_email: formData.email,

  phone: formData.phone,

  address: formData.address,

  city: formData.city,

  province: formData.province,

  postal_code: formData.postalCode,

  country: formData.country,

  payment_method: payment,

  items: cart.map((item) => ({

    product_id: item.id,

    quantity: item.quantity

  }))

};



      // Send order to Express
      const response = await fetch(
        `${API_URL}/orders`,
        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

          },

          body: JSON.stringify(orderData)

        }
      );


      const data = await response.json();


      if (!response.ok) {

        setError(
          data.message || "Unable to place order."
        );

        return;

      }


      console.log(
        "Order created:",
        data.order
      );


      // Only clear cart after successful database order
      clearCart();


      // Send the database order to success page
      navigate(
        "/order-success",
        {
          state: data.order
        }
      );


    } catch (error) {

      console.error(
        "CHECKOUT ERROR:",
        error
      );

      setError(
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }

  };


  if (cart.length === 0) {

    return (

      <Container className="py-5 text-center">

        <h2>Your cart is empty</h2>

        <p className="text-muted">
          Please add products before checkout.
        </p>

        <Button color="dark" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>

      </Container>

    );

  }


  return (

    <Container className="py-5">

      <h1 className="fw-bold mb-4">
        Checkout
      </h1>


      {error && (

        <Alert color="danger">
          {error}
        </Alert>

      )}


      <Row>

        <Col lg="7">

          <Card className="shadow">

            <CardBody>

              <form onSubmit={handleSubmit}>

                <CheckoutForm formData={formData} handleChange={handleChange} />


                <PaymentOptions payment={payment} setPayment={setPayment} />


                <Button color="success" size="lg" className="mt-4" block disabled={loading}>

                  {loading
                    ? "Placing Order..."
                    : "Place Order"
                  }

                </Button>

              </form>

            </CardBody>

          </Card>

        </Col>


        <Col lg="5">

          <OrderSummary
            cart={cart}
            cartTotal={cartTotal}
            shipping={shipping}
            vat={vat}
          />

        </Col>

      </Row>

    </Container>

  );

}


export default Checkout;
