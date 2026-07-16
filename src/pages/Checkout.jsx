import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button} from "reactstrap";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentOptions from "../components/checkout/PaymentOptions";
import OrderSummary from "../components/checkout/OrderSummary";



function Checkout() {

const navigate = useNavigate();

const {cart, cartTotal, clearCart } = useCart();

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

const shipping = 0;

const vat = cartTotal * 0.15;

const handleChange = (e) => {

    setFormData({...formData, [e.target.name]: e.target.value});

 };


const handleSubmit = (e) => {

         e.preventDefault();

const emptyField = Object.values(formData).some( field => field.trim() === "" );

        if (emptyField) {

            alert("Please complete all shipping details.");

             return;

        }


const order = {customer: formData, payment, products: cart, subtotal: cartTotal, shipping, vat, total: cartTotal + shipping + vat, orderNumber: "ORD-" + Date.now()};

            console.log(
            "Order Created:",
            order
        );

     clearCart();

     navigate("/order-success",

            {
                state: order
            }

        );

    };


    if (cart.length === 0) {

         return (

            <Container className="py-5 text-center">
                <h2>Your cart is empty</h2>

                <p className="text-muted">Please add products before checkout.</p>

                <Button color="dark" onClick={() => navigate("/")} >Continue Shopping</Button>

             </Container>
        );
    }

 return (
        <Container className="py-5">
            <h1 className="fw-bold mb-4">Checkout</h1>
              <Row>
                <Col lg="7">
                    <Card className="shadow">
                        <CardBody>

                            <form onSubmit={handleSubmit}>

                                <CheckoutForm formData={formData} handleChange={handleChange} />

                                <PaymentOptions payment={payment} setPayment={setPayment} />

                                <Button color="success" size="lg" className="mt-4"block >Place Order</Button>

                            </form>
                        </CardBody>
                     </Card>
                </Col>


                <Col lg="5">
                <OrderSummary cart={cart} cartTotal={cartTotal} shipping={shipping} vat={vat}/>

                </Col>
             </Row>
        </Container>
    );
}



export default Checkout;