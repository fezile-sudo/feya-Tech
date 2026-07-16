import React, { useState } from "react";
import {Container, Card, CardBody, Input, Button, Form, Alert} from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Register() {

  const { register, user } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");



 useEffect(() => {

  if (user) {

    navigate("/profile");

  }

}, [user, navigate]); 

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {

      setError("Passwords do not match.");

      return;

    }

    const result = register({
      name,
      email,
      password
    });

    if (!result.success) {

      setError(result.message);

      return;

    }

    navigate("/profile");

  };



  return (

    <Container className="py-5">
        <Card className="shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
            <CardBody>
              <h2 className="fw-bold mb-4"> Create Account</h2>

          {error && (

            <Alert color="danger">{error} </Alert>)}

          <Form onSubmit={handleSubmit}>

            <Input className="mb-3" placeholder="Full Name" value={name} onChange={(e) =>setName(e.target.value)} required />

            <Input className="mb-3" type="email" placeholder="Email Address" value={email} onChange={(e) =>setEmail(e.target.value)}required />

            <Input className="mb-3" type="password" placeholder="Password" value={password}  onChange={(e) =>setPassword(e.target.value) }required />

            <Input className="mb-4" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)}required />

            <Button color="dark" className="w-100">Register</Button>

          </Form>
        </CardBody>
      </Card>
    </Container>

  );

}

export default Register;