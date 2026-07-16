import React from "react";
import {Container, Card, CardBody} from "reactstrap";


function About() {

return (

    <Container className="py-5">
      <Card className="shadow">
         <CardBody className="text-center">

         <h1 className="fw-bold mb-4">About FEYATECH </h1>

         <p className="lead">
            FEYATECH provides quality technology
            products designed for professionals,
            gamers, and everyday users.
         </p>

        <p>
            Our goal is to make modern technology
            accessible by offering reliable products
            with excellent customer service.
        </p>

         </CardBody>
      </Card>
    </Container>

  );

}


export default About;