import React from "react";
import {
  Container,
  Card,
  CardBody
} from "reactstrap";


function Contact() {

  return (

    <Container className="py-5">

      <Card className="shadow">

        <CardBody className="text-center">

          <h1 className="fw-bold mb-4">
            Contact Us
          </h1>


          <p className="text-muted mb-4">
            Have a question about FeyaTech or our products?
            We'd be happy to hear from you.
          </p>


          <div className="mb-4">

            <h5 className="fw-bold">
              Email
            </h5>

            <p className="mb-0">
              info@feyatech.com
            </p>

          </div>


          <div className="mb-4">

            <h5 className="fw-bold">
              Phone
            </h5>

            <p className="mb-0">
              0781780501
            </p>

          </div>


          <div>

            <h5 className="fw-bold">
              Business Hours
            </h5>

            <p className="mb-0">
              Monday – Friday: 08:00 – 17:00
            </p>

            <p className="mb-0">
              Saturday: 09:00 – 13:00
            </p>

          </div>

        </CardBody>

      </Card>

    </Container>

  );

}


export default Contact;