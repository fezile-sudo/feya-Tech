import React, { useState } from "react";
import {Container, Card, CardBody, Form, FormGroup, Label, Input, Button} from "reactstrap";


function Contact() {

const [messageSent, setMessageSent] = useState(false);

const handleSubmit = (e) => {

    e.preventDefault();

    setMessageSent(true);

  };



  return (
    <Container className="py-5">
        <Card className="shadow">
        <CardBody>

        <h1 className="fw-bold mb-4 text-center"> Contact Us</h1>

           {
            messageSent && (<p className="text-success text-center fw-bold">Message sent successfully! </p> )
          }

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
           <Input required />
        </FormGroup>


        <FormGroup>
          <Label>Email</Label>
            <Input type="email"required />
        </FormGroup>

        <FormGroup>
          <Label>Message</Label>
            <Input type="textarea" rows="5" required/>
        </FormGroup>



            <Button color="dark">Send Message</Button>

      </Form>
    </CardBody>
  </Card>
</Container>

  );

}


export default Contact;