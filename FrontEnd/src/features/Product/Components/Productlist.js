import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categoryAsync, productAsync, selectAllProducts, selectCatagories, selectCategoryy } from '../ProductSlice'
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import Pagination from '../../common/Pagination';

const Productlist = () => {
    const Products = useSelector(selectAllProducts);
    const Categories = useSelector(selectCatagories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productAsync())
        dispatch(categoryAsync())
    }, [dispatch])

    return (
        <>
            <Navbar />
            <div className="bg-body-secondary min-vh-100">
                {/* Premium Header */}
                <div className="bg-body-tertiary shadow-sm py-3 mb-5">
                    <div className="container text-center">
                        <h1 className='display-5 fw-bold text-dark mb-2' style={{ letterSpacing: '-1px' }}>
                            MARUTI Mobile <span className='text-primary'>Collection</span>
                        </h1>
                        <p className="text-secondary lead">Premium Technology. Classic Design.</p>
                    </div>
                </div>

                <div className="container pb-5">
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
                                                <h4 className='mb-0 fw-bold text-primary'>₹{Product.price}</h4>
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

                    <div className="mt-5 d-flex justify-content-center">
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Productlist