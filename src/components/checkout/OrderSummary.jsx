import React from "react";

import {
    Card,
    CardBody
} from "reactstrap";


function OrderSummary({
    cart,
    cartTotal,
    shipping,
    vat
}) {


    return (

        <Card className="shadow">

            <CardBody>

                <h3>
                    Order Summary
                </h3>

                <hr/>


                {
                    cart.map(item => (

                        <div
                        key={item.id}
                        className="d-flex justify-content-between mb-3"
                        >

                            <span>
                                {item.title}
                                <br/>
                                Qty: {item.quantity}
                            </span>


                            <strong>
                                R{(
                                    item.price *
                                    item.quantity
                                ).toFixed(2)}
                            </strong>

                        </div>

                    ))
                }


                <hr/>


                <p>
                    Subtotal:
                    <strong className="float-end">
                        R{cartTotal.toFixed(2)}
                    </strong>
                </p>


                <p>
                    Shipping:
                    <strong className="float-end">
                        R{shipping}
                    </strong>
                </p>


                <p>
                    VAT:
                    <strong className="float-end">
                        R{vat.toFixed(2)}
                    </strong>
                </p>


                <hr/>


                <h4>
                    Total:
                    <span className="float-end">
                        R{(
                            cartTotal +
                            shipping +
                            vat
                        ).toFixed(2)}
                    </span>
                </h4>


            </CardBody>

        </Card>

    );

}


export default OrderSummary;