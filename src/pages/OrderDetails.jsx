import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Table,
  Button,
  Alert,
  Spinner
} from "reactstrap";

import { useAuth } from "../context/AuthContext";


const API_URL = "http://localhost:5000/api";


function OrderDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();


  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const response = await fetch(
          `${API_URL}/orders/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        const data = await response.json();


        if (!response.ok) {

          setError(data.message || "Failed to load order.");

          return;

        }


        setOrder(data.order);


      } catch (error) {

        console.error(
          "GET ORDER ERROR:",
          error
        );

        setError("Unable to connect to the server.");

      } finally {

        setLoading(false);

      }

    };


    if (token) {
      fetchOrder();
    }

  }, [id, token]);


  if (loading) {

    return (

      <Container className="py-5 text-center">

        <Spinner color="dark" />

        <p className="mt-3">
          Loading order...
        </p>

      </Container>

    );

  }


  if (error) {

    return (

      <Container className="py-5">

        <Alert color="danger">
          {error}
        </Alert>

        <Button color="dark" onClick={() => navigate("/profile")}>
          Back to My Orders
        </Button>

      </Container>

    );

  }


  if (!order) {
    return null;
  }


  return (

    <Container className="py-5">

      <Card className="shadow">

        <CardBody>

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h1 className="fw-bold">
                Order Details
              </h1>

              <p className="text-muted mb-0">
                {order.order_number}
              </p>

            </div>

            <span className="badge bg-warning text-dark">
              {order.status}
            </span>

          </div>


          <hr />


          <h4>Customer Information</h4>

          <p>

            <strong>Name:</strong>{" "}
            {order.customer_name}

            <br />

            <strong>Email:</strong>{" "}
            {order.customer_email}

            <br />

            <strong>Phone:</strong>{" "}
            {order.phone}

          </p>


          <p>

            <strong>Address:</strong>{" "}
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


          <Table responsive hover>

            <thead>

              <tr>

                <th>Product</th>

                <th>Quantity</th>

                <th>Price</th>

                <th>Total</th>

              </tr>

            </thead>


            <tbody>

              {order.items.map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.title}
                  </td>

                  <td>
                    {item.quantity}
                  </td>

                  <td>
                    R{" "}
                    {Number(item.price).toFixed(2)}
                  </td>

                  <td>
                    R{" "}
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </Table>


          <hr />


          <div className="ms-auto" style={{ maxWidth: "350px" }}>

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


          <div className="mt-4">

            <Button color="dark" onClick={() => navigate("/profile")}>
              ← Back to My Orders
            </Button>

          </div>

        </CardBody>

      </Card>

    </Container>

  );

}


export default OrderDetails;
