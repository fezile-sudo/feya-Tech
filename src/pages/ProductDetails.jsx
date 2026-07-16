import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Reviews from "../components/products/Reviews";
import {Container, Row, Col, Button, Badge} from "reactstrap";
import products from "../components/products/productData";
import { useCart } from "../context/CartContext";


function ProductDetails() {

const { id } = useParams();

const { addToCart } = useCart();

const product = products.find((item) => item.id === Number(id));

const [quantity, setQuantity] = useState(1);

const [added, setAdded] = useState(false);


if (!product) {
      return (
      <h2 className="text-center mt-5">Product not found</h2>
     );
  }

 const handleAddToCart = () => {addToCart(product, quantity); setAdded(true);};


return (

  <Container className="py-5">
    <Row className="align-items-center">
      <Col md="6">
          <img src={product.image} alt={product.title} className="img-fluid rounded shadow" />

      </Col>


     <Col md="6">
      <h1 className="fw-bold">{product.title}</h1>

        {
            product.category && (
                <Badge color="primary" className="mb-3" >
                    {product.category}
                </Badge>
            )
        }


        {
            product.rating && (

              <div className="mb-3">

                ⭐ {product.rating}

                {
                  product.reviews && (<span className="ms-2 text-muted">({product.reviews?.length || 0} reviews)</span>)

                }

              </div>

            )

          }


          <h3 className="mb-3">R{product.price}</h3>

          {
            product.stock && (

              <p className="text-success fw-bold"> ✓ In Stock ({product.stock} available)</p> )

          }


          <p className="text-muted">{product.description}</p>


          <div className="d-flex align-items-center gap-3 mb-4">


            <Button color="secondary" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                -
            </Button>

           <span className="fs-4 fw-bold">{quantity} </span>





            <Button color="secondary" onClick={() =>setQuantity(quantity + 1)} >
              +
            </Button>
        </div>

          <Button color="dark" size="lg" onClick={handleAddToCart}>
            Add {quantity} to Cart
          </Button>


          {
            added && (

              <div className="mt-4">
              <p className="text-success fw-bold"> ✓ Added to cart</p>

              <div className="d-flex gap-3">


                  <Button color="outline-dark" tag={Link} to="/" >
                    Continue Shopping
                  </Button>


                  <Button color="success" tag={Link} to="/cart">
                    View Cart
                  </Button>

              </div>
          </div>

            )

          }

       </Col>
      </Row>
    </Container>


  );

}


export default ProductDetails;