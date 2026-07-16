import React, { useState, useEffect } from "react";
import {Card, CardBody, Button, Input, Form} from "reactstrap";


function Reviews({ product }) {

 const [reviews, setReviews] = useState( [...(product.reviews || [])] );

 const [name, setName] = useState("");

 const [comment, setComment] = useState("");

 const [stars, setStars] = useState(5);


useEffect(() => {
  const savedReviews = localStorage.getItem(
    `reviews-${product.id}`
  );

if (savedReviews) {
    setReviews(JSON.parse(savedReviews));
  }
}, [product.id]);


useEffect(() => {

  localStorage.setItem(
    `reviews-${product.id}`,
    JSON.stringify(reviews)
  );

}, [reviews, product.id]);


 const handleSubmit = (e) => {e.preventDefault();

 const newReview = { name, comment, stars };

    setReviews([...reviews, newReview ]);

    setName("");

    setComment("");

    setStars(5);

  };


return (
  <div className="mt-5">
      <h3 className="mb-4">Customer Reviews</h3>
{
        reviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to review this product.</p>

        ) : (
        reviews.map((review, index) => (
          <Card key={index} className="mb-3 shadow-sm">
            <CardBody>
              <h5>{review.name}</h5>

              <p>{"⭐".repeat(review.stars)} </p>

              <p className="text-muted">{review.comment}</p>

            </CardBody>
          </Card>
        ))
      )
    }


          <Card className="mt-4 shadow-sm">
            <CardBody>
              <h4>Leave a Review</h4>

            <Form onSubmit={handleSubmit}>
              <Input  className="mb-3" placeholder="Your name"  value={name}  onChange={(e) => setName(e.target.value)} required />

              <Input className="mb-3" type="textarea" placeholder="Your review" value={comment} onChange={(e) => setComment(e.target.value)} required/>

              <Input className="mb-3" type="select" value={stars} onChange={(e) => setStars(Number(e.target.value))} >

              <option value="5"> ⭐⭐⭐⭐⭐ </option>

              <option value="4"> ⭐⭐⭐⭐ </option>

              <option value="3"> ⭐⭐⭐ </option>

              <option value="2"> ⭐⭐ </option>

              <option value="1"> ⭐ </option>

            </Input>


            <Button color="dark">Submit Review</Button>

          </Form>
        </CardBody>
      </Card>
    </div>

  );

}


export default Reviews;