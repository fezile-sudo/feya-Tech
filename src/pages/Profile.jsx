import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Button,
  Table,
  Badge,
  Alert
} from "reactstrap";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:5000/api";


function Profile() {

  const { user, token, logout } = useAuth();

  const navigate = useNavigate();


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchOrders = async () => {

      if (!token) {

        setLoading(false);

        return;

      }


      try {

        const response = await fetch(
          `${API_URL}/orders`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        const data = await response.json();


        if (!response.ok) {

          setError(
            data.message || "Failed to load orders."
          );

          return;

        }


        setOrders(data.orders || []);


      } catch (error) {

        console.error(
          "GET ORDERS ERROR:",
          error
        );

        setError(
          "Unable to connect to the server."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchOrders();

  }, [token]);


  if (!user) {

    return (

      <Container className="py-5">

        <h3>Please login first</h3>

      </Container>

    );

  }


  const handleLogout = () => {

    logout();

    navigate("/");

  };


  return (

    <Container className="py-5">

      {/* Profile */}

      <Card className="shadow-sm mx-auto mb-5" style={{ maxWidth: "700px" }}>

        <CardBody>

          <h2 className="fw-bold mb-4">
            My Profile
          </h2>


          <p>
            <strong>Name:</strong>{" "}
            {user.name}
          </p>


          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>


          <Button color="danger" onClick={handleLogout}>
            Logout
          </Button>

        </CardBody>

      </Card>


      {/* Orders */}

      <Card className="shadow-sm">

        <CardBody>

          <h2 className="fw-bold mb-4">
            My Orders
          </h2>


          {loading && (

            <p className="text-muted">
              Loading your orders...
            </p>

          )}


          {error && (

            <Alert color="danger">
              {error}
            </Alert>

          )}


          {!loading &&
            !error &&
            orders.length === 0 && (

              <div className="text-center py-4">

                <p className="text-muted">
                  You haven't placed any orders yet.
                </p>

                <Button color="dark" onClick={() => navigate("/")}>
                  Start Shopping
                </Button>

              </div>

            )}


          {!loading &&
            !error &&
            orders.length > 0 && (

              <Table responsive hover>

                <thead>

                  <tr>

                    <th>Order Number</th>

                    <th>Date</th>

                    <th>Total</th>

                    <th>Status</th>

                  </tr>

                </thead>


                <tbody>

                  {orders.map((order) => (

                    <tr key={order.id}>

                      <td>
                      <Button
                        color="link"
                        className="p-0 text-decoration-none"
                        onClick={() => navigate(`/orders/${order.id}`)}
                      >
                        {order.order_number}
                      </Button>
                    </td>



                      <td>
                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </td>


                      <td>
                        R{" "}
                        {Number(
                          order.total
                        ).toFixed(2)}
                      </td>


                      <td>

                        <Badge color="warning">

                          {order.status}

                        </Badge>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </Table>

            )}

        </CardBody>

      </Card>

    </Container>

  );

}


export default Profile;
