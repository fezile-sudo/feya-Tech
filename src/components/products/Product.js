import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Input
} from "reactstrap";

import ProductCard from "./ProductCard";

import "./product.css";


function Products() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showAll, setShowAll] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);

      } catch (error) {

        console.error("PRODUCT FETCH ERROR:", error);

        setError("Unable to load products.");

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  const categories = [
    "All",
    ...new Set(products.map(product => product.category))
  ];


  let filteredProducts = products.filter(
    product =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
      &&
      (
        category === "All" ||
        product.category === category
      )
  );


  if (sort === "low") {

    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );

  }


  if (sort === "high") {

    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );

  }


  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);


  if (loading) {

    return (
      <section className="products-section py-5">

        <Container>

          <h4 className="text-center">
            Loading products...
          </h4>

        </Container>

      </section>
    );

  }


  if (error) {

    return (
      <section className="products-section py-5">

        <Container>

          <h4 className="text-center text-danger">
            {error}
          </h4>

        </Container>

      </section>
    );

  }


  return (

    <section className="products-section py-5">

      <Container>

        <div className="text-center mb-5">

          <h1 className="display-5 fw-bold">
            My Products
          </h1>

        </div>


        <Row className="mb-4">

          <Col md="5">

            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </Col>


          <Col md="3">

            <Input type="select" value={category} onChange={(e) => setCategory(e.target.value)}>

              {categories.map(cat => (

                <option key={cat}>
                  {cat}
                </option>

              ))}

            </Input>

          </Col>


          <Col md="4">

            <Input type="select" value={sort} onChange={(e) => setSort(e.target.value)}>

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

            <h4 className="text-center">
              No products found
            </h4>

          ) : (

            <Row>

              {
                displayedProducts.map(product => (

                  <Col
                    lg="3"
                    md="6"
                    sm="12"
                    className="mb-4"
                    key={product.id}
                  >

                    <ProductCard product={product} />

                  </Col>

                ))
              }

            </Row>

          )
        }


        {
          filteredProducts.length > 8 && (

            <div className="text-center mt-4">

              <Button color="primary" size="lg" onClick={() => setShowAll(!showAll)}>

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
