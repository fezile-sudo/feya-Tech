import React from "react";
import {Container, Button} from "reactstrap";
import { Link } from "react-router-dom";


function Hero() {
    return (
     <section className="bg-dark text-white py-5">

         <Container>

            <div className="text-center">
            <h1 className="display-3 fw-bold"> Welcome to FEYATECH </h1>

            <p className="lead mt-3">
                 Premium technology products
                 designed for work, gaming
                 and everyday life.
            </p>

            <Button color="light" size="lg" tag={Link} to="/" className="mt-3">
                Shop Now
            </Button>
        </div>


    </Container>


</section>

    );

}


export default Hero;