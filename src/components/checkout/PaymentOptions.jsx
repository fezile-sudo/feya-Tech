import React from "react";

import {
    FormGroup,
    Label,
    Input
} from "reactstrap";


function PaymentOptions({payment, setPayment}) {


    return (

        <>

        <h3 className="mt-4">
            Payment Method
        </h3>


        <FormGroup check>

            <Label check>

                <Input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={(e)=>setPayment(e.target.value)}
                />

                Credit Card (Demo)

            </Label>

        </FormGroup>


        <FormGroup check>

            <Label check>

                <Input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={payment === "paypal"}
                    onChange={(e)=>setPayment(e.target.value)}
                />

                PayPal (Demo)

            </Label>

        </FormGroup>


        <FormGroup check>

            <Label check>

                <Input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={(e)=>setPayment(e.target.value)}
                />

                Cash on Delivery

            </Label>

        </FormGroup>

        </>

    );

}


export default PaymentOptions;