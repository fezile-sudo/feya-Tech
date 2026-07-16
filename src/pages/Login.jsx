import React, { useState, useEffect } from "react";
import {Container, Card, CardBody, Input, Button, Form, Alert} from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


function Login() {


  const { login, user } = useAuth();


  const navigate = useNavigate();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  useEffect(() => {

    if (user) {

      navigate("/profile");

    }

  }, [user, navigate]);





  const handleSubmit = (e) => {

    e.preventDefault();


    setError("");



    const result = login(
      email,
      password
    );



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
      <h2 className="fw-bold mb-4">Login</h2>

       {
          error && (<Alert color="danger">{error}</Alert> )
        }

      <Form onSubmit={handleSubmit}>
          <Input className="mb-3" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required/>

          <Input className="mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}required/>

          <Button color="dark" className="w-100" >Login </Button>

      </Form>


    <div className="text-center mt-3">

           Don't have an account?{" "}

         <Link to="/register">Register</Link>

    </div>


    </CardBody>
  </Card>
</Container>

  );

}


export default Login;