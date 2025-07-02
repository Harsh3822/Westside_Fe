import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
'../index.css'

const Product = () => {
  const [product, setProduct] = useState([]);

  const productdata = () => {
    axios
      .get('https://westside-be-vrb4.onrender.com/product', {
        params: {
          category: 'Women',
        },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    productdata();
    localStorage.setItem('endpoint', 'product'); // Moved here
  }, []);

  return (
    <div className="container mt-4" style={{ backgroundColor: 'white' }}>
      <div className="row g-4">
        {product.map((e) => (
          <div key={e.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="product-item p-2 border rounded h-100 d-flex flex-column justify-content-between shadow-sm">
              <Link to={`/Description/${e.id}`}>
                <img
                  src={e.image?.[0]}
                  alt={e.name}
                  className="product-image img-fluid rounded"
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: '250px' }}
                />
              </Link>
              <div className="product-details mt-2">
                <h6 className="product-brand text-secondary">{e.brand}</h6>
                <h6 className="product-price text-dark fw-bold">₹{e.price}</h6>
                <h6 className="product-name text-muted">{e.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
