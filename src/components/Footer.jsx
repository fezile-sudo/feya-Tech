import React from "react";
import {Container, Row, Col} from "reactstrap";
import { Link } from "react-router-dom";


function Footer() {
   return (
    <footer className="bg-dark text-white mt-5 py-5">

    <Container>
      <Row>
        <Col md="4" className="mb-4">
          <h3 className="fw-bold">FEYATECH</h3>
          <p className="text-white-50">
            Quality technology products
            for work, gaming and everyday life.
         </p>
        </Col>


        <Col md="4" className="mb-4">
          <h5>Quick Links </h5>
          <ul className="list-unstyled">

              <li><Link to="/" className="text-white text-decoration-none"> Home</Link></li>

              <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>

              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>

          </ul>
        </Col>

        <Col md="4">
          <h5>Contact</h5>
          <p className="text-white-50 mb-1">Email: info@feyatech.com</p>

          <p className="text-white-50">Phone: 041 345 6789</p>
        </Col>
      </Row>
<hr />

        <div className="text-center text-white-50">

          © {new Date().getFullYear()} FEYATECH.
          All rights reserved.

        </div>

    </Container>
    
</footer>

  );

}


export default Footer;