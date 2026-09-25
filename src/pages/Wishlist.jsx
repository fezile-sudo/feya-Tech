import React from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  Button
} from "reactstrap";

import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";


// Product images
import AppleM from "../assets/images/Apple Magic keyboard.webp";
import LogitecM from "../assets/images/Logitech MK470.webp";
import Rapoo99 from "../assets/images/Rapoo 9900M.webp";


function Wishlist() {

  const {
    wishlist,
    removeFromWishlist
  } = useWishlist();

  const {
    addToCart
  } = useCart();


  // Match database image filenames to imported images
  const imageMap = {

    "Apple Magic keyboard.webp": AppleM,

    "Logitech MK470.webp": LogitecM,

    "Rapoo 9900M.webp": Rapoo99

  };


  return (

    <Container className="py-5">


      <h2 className="mb-4 fw-bold">

        My Wishlist ❤️

      </h2>


      {
        wishlist.length === 0 ? (

          <h4 className="text-muted">

            Your wishlist is empty

          </h4>

        ) : (

          <Row>


            {
              wishlist.map(product => {


                const productImage = imageMap[product.image_url];


                return (

                  <Col lg="3" md="6" sm="12" className="mb-4" key={product.id}>


                    <Card className="shadow-sm h-100">


                      {
                        productImage ? (

                          <CardImg
                            top
                            src={productImage}
                            alt={product.title}
                            style={{
                              height: "200px",
                              objectFit: "cover"
                            }}
                          />

                        ) : (

                          <div
                            className="d-flex align-items-center justify-content-center bg-light"
                            style={{
                              height: "200px"
                            }}
                          >

                            <span className="text-muted">

                              Image unavailable

                            </span>

                          </div>

                        )
                      }


                      <CardBody>


                        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">

                          <h5 className="fw-bold">

                            {product.title}

                          </h5>

                        </Link>


                        <p>

                          R{product.price}

                        </p>


                        <Button color="dark" className="mb-2 w-100" onClick={() => addToCart(product) } >

                          Add to Cart

                        </Button>


                        <Button color="danger" className="w-100" onClick={() => removeFromWishlist(product.id)} >

                          Remove

                        </Button>


                      </CardBody>

                    </Card>


                  </Col>

                );

              })
            }


          </Row>

        )
      }


    </Container>

  );

}


export default Wishlist;