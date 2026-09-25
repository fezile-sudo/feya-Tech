import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Button,
  Table
} from "reactstrap";


function OrderSuccess() {

  const location = useLocation();

  const order = location.state;


  if (!order) {

    return (

      <Container className="py-5">

        <Card className="shadow">

          <CardBody className="text-center">

            <h2>No order information found</h2>

            <Button
              color="dark"
              tag={Link}
              to="/"
              className="mt-3"
            >
              Continue Shopping
            </Button>

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

            <h1 className="text-success">
              ✔ Order Confirmed
            </h1>

            <p className="lead">
              Thank you for your purchase!
            </p>

          </div>


          <hr />


          <h4>Order Details</h4>

          <p>
            <strong>Order Number:</strong>{" "}
            {order.order_number}
          </p>

          <p>
            <strong>Payment Method:</strong>{" "}
            {order.payment_method}
          </p>


          <hr />


          <h4>Customer Information</h4>

          <p>

            {order.customer_name}

            <br />

            {order.customer_email}

            <br />

            {order.phone}

          </p>


          <p>

            {order.address}

            <br />

            {order.city},{" "}
            {order.province}

            <br />

            {order.country}{" "}
            {order.postal_code}

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

              {order.items &&
                order.items.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.title}
                    </td>

                    <td>
                      {item.quantity}
                    </td>

                    <td>
                      R
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </td>

                  </tr>

                ))}

            </tbody>

          </Table>


          <hr />


          <div>

            <p>

              Subtotal:

              <span className="float-end">
                R{" "}
                {Number(order.subtotal).toFixed(2)}
              </span>

            </p>


            <p>

              Shipping:

              <span className="float-end">
                R{" "}
                {Number(order.shipping).toFixed(2)}
              </span>

            </p>


            <p>

              VAT:

              <span className="float-end">
                R{" "}
                {Number(order.vat).toFixed(2)}
              </span>

            </p>


            <h3>

              Total:

              <span className="float-end">
                R{" "}
                {Number(order.total).toFixed(2)}
              </span>

            </h3>

          </div>


          <div className="text-center mt-4">

            <Button color="dark" tag={Link} to="/">
              Continue Shopping
            </Button>

          </div>


        </CardBody>

      </Card>

    </Container>

  );

}


export default OrderSuccess;
