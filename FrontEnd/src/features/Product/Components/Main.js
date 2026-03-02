import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryAsync, productAsync, selectAllProducts, selectCatagories } from '../ProductSlice';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import img1 from '../../images/catagories/in-galaxy-s26-ultra-s948-sm-s948bzvcins-thumb-550793754.avif';

const Main = () => {
    const Categories = useSelector(selectCatagories);
    const dispatch = useDispatch();
    const Products = useSelector(selectAllProducts);

    useEffect(() => {
        dispatch(categoryAsync());
    }, [dispatch]);

     useEffect(() => {
            dispatch(productAsync())
            dispatch(categoryAsync())
        }, [dispatch])

    return (
        <div className="light-theme-wrapper">
            <Navbar />

            <div className="fade-in-up">
                {/* --- 1. Hero Section - Premium Light Vibe --- */}
                <div className="position-relative overflow-hidden hero-light-bg min-vh-100 d-flex align-items-center">
                    <div className="hero-glow-blue"></div>
                    <div className="container position-relative z-2 py-5">
                        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                            {/* Product Image */}
                            <div className="col-10 col-sm-8 col-lg-6 mx-auto">
                                <div className="position-relative floating-phone-light">
                                    <div className="phone-glow-behind-light"></div>
                                    <Link to={'/products'}>
                                        <img
                                            src={img1}
                                            className="d-block mx-lg-auto img-fluid position-relative z-3"
                                            alt="Premium Mobile"
                                            loading="lazy"
                                            style={{ filter: 'drop-shadow(0px 30px 40px rgba(0,0,0,0.15))' }}
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Hero Text */}
                            <div className="col-lg-6 text-center text-lg-start mt-5 mt-lg-0">
                                <div className="badge-light-blue mb-3 d-inline-block px-4 py-2 rounded-pill fw-semibold">
                                    <i className="fa-solid fa-bolt text-warning me-2"></i> New Arrivals Are Here
                                </div>
                                <h1 className="display-3 fw-bolder lh-1 mb-4 text-dark letter-spacing-tight">
                                    Experience The <br />
                                    <span className="text-gradient-blue">Next Generation</span> <br />
                                    Of Mobile Tech.
                                </h1>
                                <p className="lead text-secondary mb-5 pe-lg-5">
                                    Discover our exclusive collection of flagship smartphones, premium covers, and next-level accessories designed for your lifestyle.
                                </p>
                                <div className="d-grid gap-3 d-md-flex justify-content-md-center justify-content-lg-start">
                                    <Link to="/products" className="btn btn-blue-gradient btn-lg px-5 py-3 rounded-pill shadow-lg">
                                        Shop Collection <i className="fa-solid fa-arrow-right ms-2"></i>
                                    </Link>
                                    <Link to="#features" className="btn btn-outline-glass btn-lg px-5 py-3 rounded-pill">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. Featured Categories Section (NEW) --- */}
                <div className="py-5 bg-white">
                    <div className="container py-5">
                        <div className="text-center mb-5">
                            <h2 className="display-6 fw-bold text-dark">Shop by <span className="text-gradient-blue">Category</span></h2>
                            <p className="text-muted">Find exactly what you're looking for.</p>
                        </div>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <Link to="/products" className="text-decoration-none">
                                    <div className="category-card-light p-4 text-center h-100">
                                        <div className="cat-icon-box mx-auto mb-3 bg-soft-blue text-primary">
                                            <i className="fa-solid fa-mobile-screen-button fs-2"></i>
                                        </div>
                                        <h4 className="fw-bold text-dark">Smartphones</h4>
                                        <p className="text-muted small mb-0">Explore latest flagships</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to="/products" className="text-decoration-none">
                                    <div className="category-card-light p-4 text-center h-100">
                                        <div className="cat-icon-box mx-auto mb-3 bg-soft-purple text-purple">
                                            <i className="fa-solid fa-shield-halved fs-2"></i>
                                        </div>
                                        <h4 className="fw-bold text-dark">Premium Covers</h4>
                                        <p className="text-muted small mb-0">Protect in style</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to="/products" className="text-decoration-none">
                                    <div className="category-card-light p-4 text-center h-100">
                                        <div className="cat-icon-box mx-auto mb-3 bg-soft-orange text-orange">
                                            <i className="fa-solid fa-headphones fs-2"></i>
                                        </div>
                                        <h4 className="fw-bold text-dark">Audio & Buds</h4>
                                        <p className="text-muted small mb-0">Immersive sound</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 3. Trending Features Section --- */}
                <div className="features-light-bg py-5" id="features">
                    <div className="container py-5">
                        <div className="text-center mb-5 pb-3">
                            <h2 className="display-6 fw-bold text-dark mt-0 mb-3">Why Choose <span className="text-gradient-blue">Our Store?</span></h2>
                            <p className="text-secondary fs-5">Uncompromising quality and service.</p>
                        </div>

                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="glass-card-light h-100 p-5 text-center">
                                    <div className="icon-glow-box-light mb-4 mx-auto text-primary">
                                        <i className="fa-solid fa-microchip fs-1"></i>
                                    </div>
                                    <h4 className="fw-bold text-dark mb-3">Top Performance</h4>
                                    <p className="text-muted">
                                        We only stock devices with hyper-fast processing and intelligent power management.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="glass-card-light h-100 p-5 text-center position-relative overflow-hidden">
                                    <div className="icon-glow-box-light mb-4 mx-auto text-primary position-relative z-1">
                                        <i className="fa-solid fa-camera-retro fs-1"></i>
                                    </div>
                                    <h4 className="fw-bold text-dark mb-3 position-relative z-1">Pro-Grade Cameras</h4>
                                    <p className="text-muted position-relative z-1">
                                        Capture the night. Revolutionary zoom and AI-enhanced details for cinematic shots.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="glass-card-light h-100 p-5 text-center">
                                    <div className="icon-glow-box-light mb-4 mx-auto text-primary">
                                        <i className="fa-solid fa-truck-fast fs-1"></i>
                                    </div>
                                    <h4 className="fw-bold text-dark mb-3">Fast Delivery</h4>
                                    <p className="text-muted">
                                        Express shipping on all orders. Get your tech delivered safely to your doorstep.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 4. Bestsellers Preview (NEW) --- */}
                <div className="py-5 bg-white">
                    <div className="container py-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <h2 className="display-6 fw-bold text-dark m-0">Trending <span className="text-gradient-blue">Now</span></h2>
                            <Link to="/products" className="btn btn-outline-primary rounded-pill px-4">View All</Link>
                        </div>
                        <div className="row g-4">
                            {Products.map((Product) => (
                                <div className="col-sm-6 col-lg-4 col-xl-3 fade-in-up" key={Product.id}>
                                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden modern-card group">
                                        <Link to={`/product-detail/${Product.id}`} className='text-decoration-none'>

                                            {/* Image Section */}
                                            <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '280px', position: 'relative' }}>
                                                {/* Badge (Optional) */}
                                                <span className="position-absolute top-0 start-0 m-3 badge bg-dark text-white shadow-sm px-3 py-2 rounded-pill">
                                                    New
                                                </span>
                                                <img
                                                    src={require(`./../../../uploads/${Product.avatar}`)}
                                                    className="img-fluid transition-normal hover-scale"
                                                    style={{ maxHeight: '100%', objectFit: 'contain' }}
                                                    alt={Product.title}
                                                />
                                            </div>

                                            {/* Body Section */}
                                            <div className="card-body p-4 d-flex flex-column bg-white">
                                                <div className="mb-2">
                                                    <small className="text-uppercase fw-bold text-secondary" style={{ fontSize: '0.75rem' }}>
                                                        {Product.category || 'Smartphone'}
                                                    </small>
                                                </div>

                                                <h5 className="card-title fw-bold text-dark mb-1 text-truncate" title={Product.title}>
                                                    {Product.title}
                                                </h5>

                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="fa-solid fa-star text-warning me-1 small"></i>
                                                    <span className='fw-bold text-dark small me-1'>{Product.rating}</span>
                                                    <span className="text-muted small">/ 5</span>
                                                </div>

                                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                                    <h4 className='mb-0 fw-bold text-primary'>${Product.price}</h4>
                                                    <button className='btn btn-light rounded-circle text-primary shadow-sm hover-primary'>
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- 5. Customer Reviews (NEW) --- */}
                <div className="features-light-bg py-5">
                    <div className="container py-5 text-center">
                        <h2 className="display-6 fw-bold text-dark mb-5">What Our <span className="text-gradient-blue">Customers Say</span></h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="glass-card-light p-4 text-start h-100">
                                    <div className="text-warning mb-3">
                                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                    </div>
                                    <p className="text-muted fst-italic">"Absolutely love the service! Got my new flagship phone delivered within 2 days. The premium cover quality is unmatched."</p>
                                    <h6 className="fw-bold text-dark mt-4">- Rahul V.</h6>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="glass-card-light p-4 text-start h-100">
                                    <div className="text-warning mb-3">
                                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                    </div>
                                    <p className="text-muted fst-italic">"Best place to buy mobile accessories. The collection is trendy and the prices are very reasonable. Highly recommended!"</p>
                                    <h6 className="fw-bold text-dark mt-4">- Sneha P.</h6>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="glass-card-light p-4 text-start h-100">
                                    <div className="text-warning mb-3">
                                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i>
                                    </div>
                                    <p className="text-muted fst-italic">"Customer support is fantastic. They helped me choose the perfect audio earbuds for my daily commute."</p>
                                    <h6 className="fw-bold text-dark mt-4">- Amit M.</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 6. Promotional Banner --- */}
                <div className="position-relative py-5 overflow-hidden" style={{ backgroundColor: '#e0f2fe' }}>
                    <div className="container py-5 text-center position-relative z-1">
                        <h2 className="display-5 fw-bold text-dark mb-4">Ready to Upgrade?</h2>
                        <p className="lead text-secondary mb-5 max-w-700 mx-auto">
                            Join our newsletter and get exclusive access to early sales, new product drops, and special discounts.
                        </p>
                        <div className="mx-auto" style={{ maxWidth: '500px' }}>
                            <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border">
                                <input type="email" className="form-control border-0 px-4" placeholder="Enter your email..." />
                                <button className="btn btn-primary px-4 fw-bold" type="button">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Shapes */}
                    <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-white opacity-50" style={{ width: '300px', height: '300px', filter: 'blur(40px)' }}></div>
                    <div className="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-primary opacity-10" style={{ width: '400px', height: '400px', filter: 'blur(60px)' }}></div>
                </div>

                {/* --- 7. Clean Light Footer --- */}
                <footer className="pt-5 pb-4 bg-white border-top">
                    <div className="container">
                        <div className="row g-4 mb-4">
                            <div className="col-lg-5">
                                <h4 className="fw-bold text-dark mb-3">
                                    MARUTI <span className="text-primary">MOBILES</span>
                                </h4>
                                <p className="text-muted pe-lg-5">
                                    Your premium destination for next-gen smartphones, stylish covers, and top-tier accessories. Building the future of tech retail.
                                </p>
                                <div className="d-flex gap-3 mt-4">
                                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-dark hover-primary cursor-pointer" style={{ width: '40px', height: '40px' }}><i className="fa-brands fa-facebook-f"></i></div>
                                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-dark hover-primary cursor-pointer" style={{ width: '40px', height: '40px' }}><i className="fa-brands fa-instagram"></i></div>
                                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-dark hover-primary cursor-pointer" style={{ width: '40px', height: '40px' }}><i className="fa-brands fa-twitter"></i></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6">
                                <h6 className="text-dark fw-bold mb-3">Quick Links</h6>
                                <ul className="list-unstyled text-muted">
                                    <li className="mb-2"><Link to="/products" className="text-decoration-none text-muted footer-link-light">Smartphones</Link></li>
                                    <li className="mb-2"><Link to="/products" className="text-decoration-none text-muted footer-link-light">Accessories</Link></li>
                                    <li className="mb-2"><Link to="/about" className="text-decoration-none text-muted footer-link-light">About Us</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-6">
                                <h6 className="text-dark fw-bold mb-3">Customer Care</h6>
                                <ul className="list-unstyled text-muted">
                                    <li className="mb-2"><Link to="/my-orders" className="text-decoration-none text-muted footer-link-light">Track Order</Link></li>
                                    <li className="mb-2"><Link to="/contact" className="text-decoration-none text-muted footer-link-light">Contact Us</Link></li>
                                    <li className="mb-2"><Link to="#" className="text-decoration-none text-muted footer-link-light">Return Policy</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-3">
                                <h6 className="text-dark fw-bold mb-3">Secure Payments</h6>
                                <p className="text-muted small mb-3">We accept all major credit cards and secure payment gateways.</p>
                                <div className="d-flex gap-2 text-muted fs-3">
                                    <i className="fa-brands fa-cc-visa"></i>
                                    <i className="fa-brands fa-cc-mastercard"></i>
                                    <i className="fa-brands fa-cc-paypal"></i>
                                    <i className="fa-brands fa-cc-apple-pay"></i>
                                </div>
                            </div>
                        </div>
                        <div className="text-center border-top pt-4 mt-4 text-muted small">
                            &copy; {new Date().getFullYear()} Maruti Mobiles. All Rights Reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Main;