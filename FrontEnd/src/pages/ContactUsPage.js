import React from 'react';
import Navbar from '../features/Navbar/Navbar';
import { toast, Slide } from 'react-toastify';

const ContactUsPage = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Yahan par aap future me backend API call kar sakte hain message save karne ke liye
    // Abhi ke liye hum ek premium success toast message dikhayenge
    
    toast.success("🚀 Thank you! Your message has been sent successfully. We will get back to you soon!", {
        position: "top-center",
        transition: Slide,
        theme: "colored",
        autoClose: 4000,
    });
    
    e.target.reset(); // Form submit hone ke baad fields ko clear kar dega
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 mt-4 fade-in-up">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="lead text-secondary w-75 mx-auto">
            Have a question about a product, your order, or just want to say hi? We'd love to hear from you. Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="row g-5">
          {/* Left Side: Contact Information Cards */}
          <div className="col-lg-5">
            <h3 className="fw-bold mb-4 text-dark">Contact Information</h3>
            
            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-light p-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '50px', height: '50px'}}>
                  <i className="fa-solid fa-location-dot fs-5"></i>
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">Our Store</h5>
                  <p className="text-muted mb-0">1, Krishna Park, Sudama Chowk, Mota Varachha,<br/>Surat, Gujarat 395007</p>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-light p-3">
              <div className="d-flex align-items-center">
                <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '50px', height: '50px'}}>
                  <i className="fa-solid fa-phone fs-5"></i>
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">Call Us</h5>
                  <p className="text-muted mb-0">+91 99255 65043<br/>Mon-Sat: 10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-light p-3">
              <div className="d-flex align-items-center">
                <div className="bg-success text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '50px', height: '50px'}}>
                  <i className="fa-solid fa-envelope fs-5"></i>
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">Email Us</h5>
                  <p className="text-muted mb-0">support@marutimobiles.com<br/>info@marutimobiles.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-lg rounded-4 p-5">
              <h3 className="fw-bold mb-4 text-dark">Send us a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Your Name</label>
                    <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="John Doe" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="john@example.com" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Subject</label>
                    <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="How can we help you?" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea className="form-control form-control-lg bg-light border-0" rows="5" placeholder="Write your message here..." required></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow w-100 fw-bold">
                      Send Message <i className="fa-regular fa-paper-plane ms-2"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUsPage;