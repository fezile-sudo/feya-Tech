import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import { useCart } from "../context/CartContext";

function NavBar() {

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Navbar color="dark" dark expand="md">
      <Container>

        <NavbarBrand href="/">
          FEYATECH
        </NavbarBrand>


        <div className="text-white">
          🛒 Cart ({cartCount})
        </div>

      </Container>
    </Navbar>
  );
}

export default NavBar;