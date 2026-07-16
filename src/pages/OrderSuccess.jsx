import React from "react";
import { useLocation, Link } from "react-router-dom";
import {Container, Card, CardBody, Button, Table} from "reactstrap";


function OrderSuccess() {

const location = useLocation();

const order = location.state;

if (!order) {
    return (
        <Container className="py-5">
            <Card className="shadow">
                <CardBody className="text-center">
                <h2>No order information found</h2>
                    <Button color="dark" tag={Link} to="/" className="mt-3">Continue Shopping</Button>

                </CardBody>
            </Card>
        </Container>
     );
}

    return (
        <Container className="py-5">
            <Card className="shadow">
                <CardBody>
                <div className="text-center mb-4">
                <h1 className="text-success">✔ Order Confirmed </h1>
                <p className="lead">Thank you for your purchase!</p>
            </div>

    <hr />

            <h4>Order Details</h4>
            <p><strong> Order Number:</strong>{" "}{order.orderNumber}</p>
            <p><strong>Payment Method: </strong>{" "} {order.payment}</p>
    <hr />

            <h4>Customer Information</h4>
            <p>
                {order.customer.name}
            <br />
                {order.customer.email}

            <br />
                {order.customer.phone}

            </p>

            <p>

                {order.customer.address}
            <br />

                {order.customer.city},{" "}

                 {order.customer.province}
            <br />

                {order.customer.country}

                {" "}

                {order.customer.postalCode}

            </p>
    <hr />

            <h4>Items Purchased</h4>

            <Table responsive>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                    <tbody>
                    {
                        order.products.map(item => (
                        <tr key={item.id}>
                        <td>{item.title} </td>
                        <td>{item.quantity}</td>
                        <td>R{(item.price *item.quantity).toFixed(2)}</td>
                    </tr>
                ))
            }
                    </tbody>
                </Table>
    <hr />

                <div>
                    <p>Subtotal:<span className="float-end">R {order.subtotal.toFixed(2)}</span></p>
                    <p>Shipping:<span className="float-end">R{order.shipping.toFixed(2) }</span></p>
                    <p>VAT:<span className="float-end"> R{order.vat.toFixed(2)} </span></p>


                    <h3>Total:<span className="float-end">R {order.total.toFixed(2)}</span></h3>

                 </div>



                <div className="text-center mt-4">

                    <Button color="dark" tag={Link} to="/" > Continue Shopping </Button>
                </div>

            </CardBody>
        </Card>
     </Container>
    );

}


export default OrderSuccess;