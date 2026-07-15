import React from "react";

import {
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col
} from "reactstrap";


function CheckoutForm({ formData, handleChange }) {


    return (

        <Form>

            <h3 className="mb-4">
                Customer Information
            </h3>


            <FormGroup>

                <Label>
                    Full Name
                </Label>

                <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />

            </FormGroup>



            <Row>

                <Col md="6">

                    <FormGroup>

                        <Label>
                            Email
                        </Label>

                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                        />

                    </FormGroup>

                </Col>


                <Col md="6">

                    <FormGroup>

                        <Label>
                            Phone
                        </Label>

                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="012 345 6789"
                        />

                    </FormGroup>

                </Col>

            </Row>



            <h3 className="mt-4 mb-4">
                Shipping Address
            </h3>



            <FormGroup>

                <Label>
                    Street Address
                </Label>

                <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />

            </FormGroup>



            <Row>

                <Col md="6">

                    <FormGroup>

                        <Label>
                            City
                        </Label>

                        <Input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />

                    </FormGroup>

                </Col>


                <Col md="6">

                    <FormGroup>

                        <Label>
                            Province
                        </Label>

                        <Input
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                        />

                    </FormGroup>

                </Col>

            </Row>



            <Row>

                <Col md="6">

                    <FormGroup>

                        <Label>
                            Postal Code
                        </Label>

                        <Input
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />

                    </FormGroup>

                </Col>


                <Col md="6">

                    <FormGroup>

                        <Label>
                            Country
                        </Label>

                        <Input
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />

                    </FormGroup>

                </Col>

            </Row>


        </Form>

    );

}


export default CheckoutForm;