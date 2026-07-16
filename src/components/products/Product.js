import React, { useState } from "react";

import {Container, Row, Col, Button, Input} from "reactstrap";
import ProductCard from "./ProductCard";
import products from "./productData";

import "./product.css";


function Products() {


  const [showAll, setShowAll] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");

  const categories = [ "All", ...new Set( products.map( product => product.category) ) ];



  let filteredProducts = products.filter(
      product =>product.title.toLowerCase().includes(search.toLowerCase() )
      &&
      (category === "All" || product.category === category )
    );

  if (sort === "low") {
      filteredProducts = [...filteredProducts].sort((a,b) => a.price - b.price);
     }

  if (sort === "high") {
      filteredProducts = [...filteredProducts].sort((a,b) => b.price - a.price);
     }



  const displayedProducts = showAll ? filteredProducts: filteredProducts.slice(0,8);
    return (
      <section className="products-section py-5">
        <Container>
            <div className="text-center mb-5">
            <h1 className="display-5 fw-bold"> My Products</h1>

        </div>

          <Row className="mb-4">
          <Col md="5">
            <Input placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)} />
          </Col>

          <Col md="3">
            <Input type="select" value={category} onChange={(e)=>setCategory(e.target.value) } >
                {categories.map(cat => (
                <option key={cat} >
                  {cat}
                </option>

                ))
              }
            </Input>

          </Col>


          <Col md="4">
            <Input type="select" value={sort} onChange={(e)=>setSort(e.target.value)}>
              <option value="">
                Sort By Price
              </option>

              <option value="low">
                Price: Low to High
              </option>


              <option value="high">
                Price: High to Low
              </option>
            </Input>
          </Col>
         </Row>


        {
          displayedProducts.length === 0 ? (
           <h4 className="text-center"> No products found</h4> ) : (
            <Row>
            { displayedProducts.map(product => (
              <Col lg="3" md="6" sm="12" className="mb-4" key={product.id}>
              <ProductCard
                      product={product}/>
              </Col>

            )) }
            </Row>
          )

        }

        {
          filteredProducts.length > 8 && (
            <div className="text-center mt-4">
            <Button color="primary" size="lg" onClick={()=>setShowAll(!showAll)}>
                {
                  showAll
                  ? "Show Less"
                  : "Show More"
                }
                </Button>

            </div>
          )
        }
      </Container>
    </section>

  );

}


export default Products;