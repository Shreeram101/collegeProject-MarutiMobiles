import React from 'react';
import Navbar from '../features/Navbar/Navbar';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container py-5 mt-4 fade-in-up">
        
        {/* Hero Section */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold text-dark mb-3">
              About <span className="text-danger">MARUTI</span> <span className="text-primary">MOBILES</span>
            </h1>
            <p className="lead text-secondary">
              Your trusted destination for the latest smartphones, premium gadgets, and exclusive tech accessories.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="row align-items-center mb-5 py-4">
          <div className="col-lg-6 mb-4 mb-lg-0 pe-lg-5">
            <div className="position-relative">
               {/* Aap yahan koi local image bhi use kar sakte hain require() ke sath */}
              <img 
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="About Maruti Mobiles" 
                className="img-fluid rounded-4 shadow-lg object-fit-cover" 
                style={{minHeight: '400px'}}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4 display-6 text-dark">Our Story</h2>
            <p className="text-muted fs-5" style={{ lineHeight: '1.8' }}>
              Founded with a passion for technology, <strong>Maruti Mobiles</strong> started as a small electronics shop and has grown into a premier online tech retailer. We believe that top-tier technology should be accessible, reliable, and affordable for everyone.
            </p>
            <p className="text-muted fs-5" style={{ lineHeight: '1.8' }}>
              We partner directly with leading global brands like Apple, Samsung, Google, and OnePlus to bring you 100% authentic products. Whether you need a flagship smartphone or high-quality earbuds, we've got you covered.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-light rounded-4 p-5 mb-5 shadow-sm border">
          <h2 className="text-center fw-bold mb-5 text-dark">Why Choose Us?</h2>
          <div className="row g-4 text-center">
            
            <div className="col-md-4">
              <div className="fs-1 text-primary mb-3">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h4 className="fw-bold text-dark">Fast Delivery</h4>
              <p className="text-muted">Get your devices delivered safely and quickly right to your doorstep, anywhere.</p>
            </div>
            
            <div className="col-md-4">
              <div className="fs-1 text-danger mb-3">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h4 className="fw-bold text-dark">100% Authentic</h4>
              <p className="text-muted">All our products are completely genuine and come with official brand warranties.</p>
            </div>
            
            <div className="col-md-4">
              <div className="fs-1 text-success mb-3">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h4 className="fw-bold text-dark">24/7 Support</h4>
              <p className="text-muted">Our dedicated customer service team is always here to help you out with any queries.</p>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5 mb-4">
          <h3 className="fw-bold mb-4 text-dark">Ready to upgrade your tech?</h3>
          <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow-lg fw-bold">
            Explore Our Products <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>

      </div>
    </>
  )
}

export default AboutPage;