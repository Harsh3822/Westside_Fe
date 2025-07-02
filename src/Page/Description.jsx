import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

const Description = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    axios
      .get(`https://westside-be-vrb4.onrender.com/product/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  const addToCart = () => {
    axios
      .post("https://westside-be-vrb4.onrender.com/cart", {
        productId: id,
        quantity: 1,
        image: data.image?.[0],
        title: data.name,
        price: data.price,
      })
      .then(() => alert("Product added to cart!"))
      .catch(() => alert("Failed to add product to cart"));
  };

  return (
    <div className="container mt-3 mb-5">
      <div className="row">
        {/* Images Section */}
        <div className="col-12 col-lg-6">
          <div className="row g-2">
            {data.image?.map((img, i) => (
              <div key={i} className="col-6">
                <img src={img} alt={`img-${i}`} className="img-fluid rounded shadow-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <h6 className="fw-bold text-secondary">{data.brand}</h6>
          <h3 className="fw-normal">{data.name}</h3>
          <p className="text-danger fw-semibold">
            ₹{data.price} <span className="text-muted">MRP incl. of all taxes</span>
          </p>
          <hr />

          {/* Sizes */}
          <h6 className="fw-semibold">Size</h6>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {data.sizes?.map((size, index) => (
              <button
                key={index}
                className="btn btn-outline-dark btn-sm"
                style={{ minWidth: "60px" }}
              >
                {size}
              </button>
            ))}
          </div>

          <h6 className="text-success mb-3">
            Go Green! Returns available only at Westside stores
          </h6>

          {/* Add to Cart */}
          <Link to="/Cart">
            <button
              onClick={addToCart}
              className="btn btn-dark w-100 mb-4"
              style={{ maxWidth: "250px" }}
            >
              ADD TO CART
            </button>
          </Link>

          {/* Service Icons */}
          <div className="d-flex flex-wrap justify-content-between text-center gap-3 mb-4">
            <div className="flex-fill">
              <img
                src="https://cdn.shopify.com/s/files/1/0266/6276/4597/files/shipped.svg?v=1705641844"
                alt="Shipping"
                className="img-fluid"
                style={{ width: "50px" }}
              />
              <h6>Free Shipping</h6>
            </div>
            <div className="flex-fill">
              <img
                src="https://cdn.shopify.com/s/files/1/0266/6276/4597/files/delivery-status.svg?v=1705641828"
                alt="Returns"
                className="img-fluid"
                style={{ width: "50px" }}
              />
              <h6>Easy Returns</h6>
            </div>
            <div className="flex-fill">
              <img
                src="https://cdn.shopify.com/s/files/1/0266/6276/4597/files/clean-clothes_1.svg?v=1705641826"
                alt="Fashion"
                className="img-fluid"
                style={{ width: "50px" }}
              />
              <h6>Fresh Fashion</h6>
            </div>
          </div>

          {/* Accordion */}
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Product Details and Overview</Accordion.Header>
              <Accordion.Body style={{ backgroundColor: "#fafafa" }}>
                SKU: 300965263001 <br />
                Description: Joggers <br />
                Dimensions: 74cm <br />
                Fashionably embrace comfort with the Studiofit joggers in chic green, a true vogue statement. Its elastic mid-waistband, ankle cuffs, drawstrings, pockets, and self-pattern make it a must-have for your fashion-forward wardrobe. Pair it effortlessly with a fitted tee and sneakers for a chic and laid-back look. <br />
                Net Quantity: 1N <br />
                Waist Rise: Mid Rise <br />
                Fit: Regular Fit <br />
                Care Instruction: Machine Wash <br />
                Fabric Composition: 100% Cotton <br />
                Model Fit: The model is 5'9" and wearing a size <br />
                Manufactured and Marketed By: Trent Limited, Bombay House, 24, Homi Mody Street, Fort, Mumbai – 400001 <br />
                Country Of Origin: India
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Delivery & Return</Accordion.Header>
              <Accordion.Body style={{ backgroundColor: "#fafafa" }}>
                TERMS & CONDITIONS <br />
                PRIVACY POLICY <br />
                Contact Us
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Contact Us</Accordion.Header>
              <Accordion.Body style={{ backgroundColor: "#fafafa" }}>
                7506401234, 18002099901 <br />
                Timings - 9 am to 8 pm (All days) <br />
                <strong>westside@trent-tata.com</strong> <br />
                For Customer Complaints: Incharge, Trent Ltd, Bombay House, 24, Homi Mody Street, Fort, Mumbai – 400001
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Description;
