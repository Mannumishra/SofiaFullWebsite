import React from 'react';
import Products from '../components/Products';

function OurProduct() {
  return (
    <>
      <section className="implants">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ourproduct">
                <h2 className="product">Our Products</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Products />
    </>
  )
}

export default OurProduct;
