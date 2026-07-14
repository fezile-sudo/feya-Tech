import React from "react";
import {
  Navbar,
  NavbarBrand,
  Container,
  Badge
} from "reactstrap";

import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


function NavBar() {

  const { cart } = useCart();


  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  return (

    <Navbar
      color="dark"
      dark
      expand="md"
      className="shadow-sm"
    >

      <Container>


        <NavbarBrand
          tag={Link}
          to="/"
          className="fw-bold"
        >
          FEYATECH
        </NavbarBrand>


        <Link
          to="/cart"
          className="text-white text-decoration-none position-relative"
        >

          🛒


          {cartCount > 0 && (

            <Badge
              color="danger"
              pill
              className="position-absolute top-0 start-100 translate-middle"
            >
              {cartCount}
            </Badge>

          )}

        </Link>


      </Container>

    </Navbar>

  );

}


export default NavBar;