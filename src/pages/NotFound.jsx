import React from "react";
import {Container, Button} from "reactstrap";
import { Link } from "react-router-dom";


function NotFound() {
    return (
        <Container className="text-center py-5">
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="mb-4">Page Not Found</h2>

        <p className="text-muted mb-4">Sorry, the page you are looking for does not exist.</p>


      <Button color="dark" tag={Link}to="/"> Back Home</Button>


    </Container>

  );

}


export default NotFound;