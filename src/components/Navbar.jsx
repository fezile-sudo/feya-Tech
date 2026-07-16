import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Container,
  Badge,
  Button
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";



function NavBar() {

  const [isOpen, setIsOpen] = useState(false);

  const { cart } = useCart();

  const { wishlist } = useWishlist();

  const { user, logout } = useAuth();

  const navigate = useNavigate();


  const cartCount = cart.reduce((total, item) => total + item.quantity,0);


  const wishlistCount = wishlist.length;

  const handleLogout = () => {

    logout();

    navigate("/");

  };



return (

  <Navbar color="dark" dark expand="md" className="shadow-sm">

  <Container>

      <NavbarBrand tag={Link} to="/" className="fw-bold fs-4" >FEYATECH</NavbarBrand>

      <NavbarToggler onClick={() =>setIsOpen(!isOpen)} />

      <Collapse isOpen={isOpen} navbar className="justify-content-end" >

      <Nav className="ms-auto align-items-center" navbar >

      <NavItem><Link to="/" className="nav-link text-white">Home</Link></NavItem>

      <NavItem><Link to="/" className="nav-link text-white">Shop</Link></NavItem>

      <NavItem><Link to="/about" className="nav-link text-white">About</Link></NavItem>

      <NavItem><Link to="/contact" className="nav-link text-white">Contact</Link></NavItem>


   {
        user ? (

        <>

        <NavItem><span className="nav-link text-white"> Welcome, {user.name}</span></NavItem>

        <NavItem><Button color="link" className="text-white nav-link" onClick={handleLogout}>Logout</Button></NavItem>

        </>

        ) : (

        <>

        <NavItem><Link to="/login" className="nav-link text-white">Login</Link></NavItem>

        <NavItem><Link to="/register" className="nav-link text-white">Register</Link></NavItem>

        </>

        )

      }

</Nav>

      <Link to="/wishlist" className="text-white text-decoration-none position-relative fs-4 me-3">

             ❤️

        {
            wishlistCount > 0 && (

                <Badge color="danger" pill className="position-absolute top-0 start-100 translate-middle" >{wishlistCount}</Badge>

          )
        }

    </Link>

    <Link to="/cart" className="text-white text-decoration-none position-relative fs-4">

             🛒
        {
            cartCount > 0 && (

                <Badge color="danger" pill className="position-absolute top-0 start-100 translate-middle" >{cartCount}</Badge>

            )
        }


          </Link>

        </Collapse>

     </Container>

  </Navbar>
);

}


export default NavBar;