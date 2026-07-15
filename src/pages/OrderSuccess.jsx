import React from "react";
import { Link } from "react-router-dom";

import {
    Container,
    Card,
    CardBody,
    Button
} from "reactstrap";

function OrderSuccess() {

    return (

        <Container className="py-5">

            <Card
                className="shadow text-center p-5"
            >

                <CardBody>

                    <h1 className="text-success">

                        ✔ Order Successful

                    </h1>

                    <p className="mt-3">

                        Thank you for shopping with us.

                    </p>

                    <p>

                        Your order has been received and is being processed.

                    </p>

                    <Button
                        color="dark"
                        tag={Link}
                        to="/"
                    >

                        Continue Shopping

                    </Button>

                </CardBody>

            </Card>

        </Container>

    );

}

export default OrderSuccess;