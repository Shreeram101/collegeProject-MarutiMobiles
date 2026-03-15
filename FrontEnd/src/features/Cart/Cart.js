import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemFromCartAsync, selectCartLoaded, selectItems } from './cartSlice'
import { Link, Navigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const cartLoaded = useSelector(selectCartLoaded);
    let subtotal = 0;
    let totalItem = 0;

    const handleRemove = (id) => {
        dispatch(deleteItemFromCartAsync(id))
    }

    if (items) {
        items.forEach((data) => {
            subtotal += data.qty * data.product.price
            totalItem += data.qty
        })
    }

    return (
        <>
            {!items.length && cartLoaded && <Navigate to="/" replace={true}></Navigate>}

            <div className="container py-5 fade-in-up">
                <h2 className="mb-4 fw-bold text-dark">Shopping Cart</h2>

                <div className="row g-4">
                    {/* Cart Items List */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="card-body p-0">
                                {items.map((item) => (
                                    <div className="p-4 border-bottom position-relative" key={item.product.id}>
                                        <div className="row align-items-center">
                                            {/* Image */}
                                            <div className="col-md-3 mb-3 mb-md-0">
                                                <div className="bg-light rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ height: '120px' }}>
                                                    <img
                                                        src={require(`../../uploads/${item.product.avatar}`)}
                                                        alt={item.product.title}
                                                        className='img-fluid'
                                                        style={{ maxHeight: '100%', objectFit: 'contain' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="col-md-5 mb-3 mb-md-0">
                                                <h5 className="fw-bold text-dark mb-1">{item.product.title}</h5>
                                                <p className="text-muted small mb-2">{item.product.category}</p>
                                                <span className="badge bg-light text-secondary border">ID: {item.product.id}</span>
                                            </div>

                                            {/* Qty & Price */}
                                            <div className="col-md-4 d-flex flex-column align-items-end justify-content-between h-100">
                                                <h5 className="fw-bold text-primary mb-3">₹{item.product.price}</h5>

                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="quantity-wrapper bg-light px-2 py-1 rounded">
                                                        <span className="text-muted small me-2">Qty:</span>
                                                        <span className="fw-bold text-dark">{item.qty}</span>
                                                    </div>

                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="btn btn-outline-danger btn-sm border-0 rounded-pill px-3"
                                                    >
                                                        <i className="fa-solid fa-trash me-2"></i>Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-lg rounded-4 bg-white">
                            <div className="card-body p-4">
                                <h4 className="fw-bold mb-4">Order Summary</h4>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-secondary">Total Items</span>
                                    <span className="fw-bold">{totalItem}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="text-secondary">Subtotal</span>
                                    <span className="fw-bold fs-5">₹{subtotal}</span>
                                </div>

                                <hr className="my-4 text-muted" />

                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5">Total</span>
                                    <span className="fw-bold fs-4 text-primary">₹{subtotal}</span>
                                </div>

                                <div className="d-grid gap-3">
                                    <Link to={'/checkout'} className='btn btn-primary-custom shadow-md text-center py-3'>
                                        Proceed to Checkout
                                    </Link>
                                    <Link to={'/'} className='btn btn-light text-secondary py-3 fw-semibold'>
                                        <i className="fa-solid fa-arrow-left me-2"></i>
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart