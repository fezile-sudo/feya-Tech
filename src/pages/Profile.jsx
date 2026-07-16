import React from "react";
import {Container, Card, CardBody, Button} from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Profile() {

const {user, logout } = useAuth();

const navigate = useNavigate();

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
        <Card className="shadow-sm mx-auto" style={{maxWidth:"500px"}}>
            <CardBody>
              <h2 className="fw-bold mb-4"> My Profile</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>

              <Button color="danger" onClick={handleLogout}>Logout</Button>
             </CardBody>
        </Card>
</Container>

  );

}


export default Profile;