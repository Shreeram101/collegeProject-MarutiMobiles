import React, { useState } from 'react'
import { deleteItemFromCartAsync, selectItems } from '../features/Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { createOrderAsync, selectCurrentOrder } from '../features/Order/OrderSlice';
import Navbar from '../features/Navbar/Navbar';

const CheckOut = () => {
    const items = useSelector(selectItems);
    const user = useSelector(selectUserInfo);
    const currentOrder = useSelector(selectCurrentOrder);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    let subtotal = 0;
    let totalItem = 0;

    items && items.forEach((data) => {
        subtotal += data.qty * data.product.price
        totalItem += data.qty
    })

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null)

    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value]);
    }

    const handlePayment = (e) => {
        setPaymentMethod(e.target.value);
    }

    const handleOrder = () => {
        if (selectedAddress && paymentMethod) {
            const order = {
                items,
                subtotal,
                totalItem,
                user: user.id,
                paymentMethod,
                selectedAddress,
            };
            dispatch(createOrderAsync(order));
        } else {
            alert('Please select an address and payment method.');
        }
    }

    const handleRemove = (id) => dispatch(deleteItemFromCartAsync(id));

    return (
        <>
            <Navbar />
            {currentOrder && currentOrder.paymentMethod === 'cash' && (
                <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
            )}

            {currentOrder && currentOrder.paymentMethod === 'card' && (
                <Navigate to={`/stripe-checkout/`} replace={true} />
            )}

            <div className="bg-light min-vh-100 py-5 fade-in-up">
                <div className="container">
                    <div className="row g-5">
                        {/* LEFT COLUMN: Forms */}
                        <div className="col-lg-7">
                            {/* Section 1: Address Selection */}
                            <div className="card border-0 shadow-sm rounded-4 mb-4">
                                <div className="card-header bg-white py-3 border-bottom">
                                    <h5 className="mb-0 fw-bold text-primary">1. Shipping Address</h5>
                                </div>
                                <div className="card-body p-4">
                                    {/* Existing Addresses */}
                                    {user && user.addresses.length > 0 && (
                                        <div className="mb-4">
                                            <p className="small text-muted fw-bold text-uppercase mb-3">Select from saved addresses</p>
                                            <div className="d-flex flex-column gap-3">
                                                {user.addresses.map((address, index) => (
                                                    <label key={index} className={`card p-3 cursor-pointer transition-fast border-2 ${selectedAddress === address ? 'border-primary bg-primary-subtle' : 'border-light hover-shadow'}`} style={{ cursor: 'pointer' }}>
                                                        <div className="d-flex align-items-start">
                                                            <input
                                                                onChange={handleAddress}
                                                                name='address'
                                                                type="radio"
                                                                value={index}
                                                                className='form-check-input mt-1 me-3'
                                                            />
                                                            <div>
                                                                <h6 className="fw-bold mb-1">{address.fullname}</h6>
                                                                <p className="mb-1 small text-secondary">{address.streetaddress}, {address.city}</p>
                                                                <p className="mb-0 small text-secondary">Phone: {address.phone}</p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Add New Address Form Accordion/Section */}
                                    <div className="mt-4">
                                        <p className="small text-muted fw-bold text-uppercase mb-3">Or add a new address</p>
                                        <form onSubmit={handleSubmit((data) => {
                                            dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }));
                                            reset();
                                        })} className="row g-3">
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" placeholder="Full Name" {...register('fullname', { required: true })} />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="email" className="form-control" placeholder="Email" {...register('emailaddress', { required: true })} />
                                            </div>
                                            <div className="col-12">
                                                <input type="text" className="form-control" placeholder="Street Address" {...register('streetaddress', { required: true })} />
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" className="form-control" placeholder="City" {...register('city', { required: true })} />
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" className="form-control" placeholder="State" {...register('state', { required: true })} />
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" className="form-control" placeholder="Zip Code" {...register('Pincode', { required: true })} />
                                            </div>
                                            <div className="col-12">
                                                <input type="tel" className="form-control" placeholder="Phone" {...register('phone', { required: true })} />
                                            </div>
                                            <div className="col-12 text-end">
                                                <button type='submit' className='btn btn-outline-primary btn-sm'>Save Address</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Payment */}
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-header bg-white py-3 border-bottom">
                                    <h5 className="mb-0 fw-bold text-primary">2. Payment Method</h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex gap-4">
                                        <div className="form-check p-3 border rounded w-50">
                                            <input onChange={handlePayment} className="form-check-input" type="radio" name="payment" id="cash" value="cash" checked={paymentMethod === 'cash'} />
                                            <label className="form-check-label fw-bold ms-2" htmlFor="cash">
                                                <i className="fa-solid fa-money-bill-wave text-success me-2"></i> Cash on Delivery
                                            </label>
                                        </div>
                                        <div className="form-check p-3 border rounded w-50">
                                            <input onChange={handlePayment}
                                                className="form-check-input" type="radio" name="payment" id="card" value="card" checked={paymentMethod === 'card'} />
                                            <label className="form-check-label fw-bold ms-2" htmlFor="card">
                                                <i className="fa-brands fa-cc-visa text-primary me-2"></i> Card Payment
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Summary */}
                        <div className="col-lg-5">
                            <div className="card border-0 shadow-lg rounded-4 position-sticky" style={{ top: '20px' }}>
                                <div className="card-header bg-white py-3 border-bottom">
                                    <h5 className="mb-0 fw-bold text-dark">Order Summary</h5>
                                </div>
                                <div className="card-body p-0">
                                    <div className="p-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        {items.map((item) => (
                                            <div className="d-flex mb-4" key={item.id}>
                                                <img
                                                    src={require(`../uploads/${item.product.avatar}`)}
                                                    alt={item.product.title}
                                                    className="rounded border"
                                                    width="70" height="70"
                                                    style={{ objectFit: 'contain' }}
                                                />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="fw-bold mb-1 text-truncate" style={{ maxWidth: '200px' }}>{item.product.title}</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <small className="text-secondary">Qty: {item.qty}</small>
                                                        <span className="fw-semibold">${item.product.price}</span>
                                                    </div>
                                                    <button onClick={() => handleRemove(item.id)} className="btn btn-link btn-sm text-danger p-0 text-decoration-none small mt-1">Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-light p-4">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-secondary">Subtotal</span>
                                            <span className="fw-semibold">${subtotal}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="text-secondary">Shipping</span>
                                            <span className="text-success fw-bold">Free</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between mb-4">
                                            <span className="fs-5 fw-bold">Total</span>
                                            <span className="fs-4 fw-bold text-primary">${subtotal}</span>
                                        </div>
                                        <button
                                            onClick={handleOrder}
                                            className="btn btn-primary-custom w-100 py-3 shadow-md"
                                        >
                                            Place Order
                                        </button>
                                        <div className="text-center mt-3">
                                            <Link to="/products" className="text-decoration-none text-secondary small">
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut