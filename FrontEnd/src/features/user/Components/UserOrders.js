import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from '../userSlice';

const UserOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectUserOrders);
    const user = useSelector(selectUserInfo);

    useEffect(() => {
        // Only fetch if user data is available
        if (user) {
            dispatch(fetchLoggedInUserOrdersAsync(user.id))
        }
    }, [dispatch, user]) // Added user dependency

    return (
        <div className="container py-5 fade-in-up">
            <h2 className="mb-4 fw-bold text-dark border-start border-5 border-primary ps-3">My Order History</h2>

            {orders && orders.length > 0 ? (
                <div className="d-flex flex-column gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            {/* Order Header */}
                            <div className="card-header bg-white border-bottom p-4 d-flex flex-wrap justify-content-between align-items-center bg-opacity-10">
                                <div>
                                    <span className="text-secondary small text-uppercase fw-bold d-block">Order ID</span>
                                    <span className="fw-bold fs-5 text-dark">#{order.id}</span>
                                </div>
                                <div>
                                    <span className="text-secondary small text-uppercase fw-bold d-block">Status</span>
                                    <span className={`badge px-3 py-2 rounded-pill ${order.status === 'delivered' ? 'bg-success text-white' :
                                            order.status === 'dispatched' ? 'bg-primary text-white' :
                                                'bg-warning text-dark'
                                        }`}>
                                        {order.status || 'Pending'}
                                    </span>
                                </div>
                                <div className="text-end">
                                    <span className="text-secondary small text-uppercase fw-bold d-block">Total Amount</span>
                                    <span className="fw-bold fs-5 text-primary">₹{order.subtotal}</span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="card-body p-0">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-4 border-bottom position-relative hover-bg-light transition-fast">
                                        <div className="row align-items-center">
                                            <div className="col-md-2 mb-3 mb-md-0">
                                                <div className="bg-light rounded p-2 d-flex justify-content-center" style={{ height: '100px' }}>
                                                    <img
                                                        src={require(`./../../../uploads/${item.product.avatar}`)}
                                                        alt={item.product.title}
                                                        className='img-fluid'
                                                        style={{ maxHeight: '100%', objectFit: 'contain' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <h5 className='fw-bold text-dark mb-1'>{item.product.title}</h5>
                                                <p className='text-muted small mb-0'>{item.product.category}</p>
                                            </div>
                                            <div className="col-md-4 text-md-end">
                                                <div className="d-inline-flex align-items-center gap-4">
                                                    <div className="text-center">
                                                        <small className="text-secondary d-block">Qty</small>
                                                        <span className="fw-bold">{item.qty}</span>
                                                    </div>
                                                    <div className="text-end">
                                                        <small className="text-secondary d-block">Price</small>
                                                        <span className="fw-bold text-dark">₹{item.product.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer / Shipping */}
                            <div className="card-footer bg-light p-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="fw-bold text-secondary mb-3"><i className="fa-solid fa-location-dot me-2"></i>Shipping Address</h6>
                                        <div className="bg-white p-3 rounded border shadow-sm">
                                            {/* Correctly display the address saved with the order */}
                                            <p className="fw-bold mb-1">{order.selectedAddress.fullname}</p>
                                            <p className="text-secondary small mb-1">
                                                {order.selectedAddress.streetaddress}, <br />
                                                {order.selectedAddress.city}, {order.selectedAddress.state} - {order.selectedAddress.Pincode}
                                            </p>
                                            <p className="text-secondary small mb-0">
                                                <i className="fa-solid fa-phone me-1"></i> {order.selectedAddress.phone}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-end mt-4 mt-md-0">
                                        <div className="w-100 text-end" style={{ maxWidth: '250px' }}>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-secondary">Total Items</span>
                                                <span className="fw-semibold">{order.totalItem}</span>
                                            </div>
                                            <hr className="my-2" />
                                            <div className="d-flex justify-content-between">
                                                <span className="fw-bold text-dark">Grand Total</span>
                                                <span className="fw-bold text-primary fs-5">₹{order.subtotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="mb-3 text-secondary opacity-50"><i className="fa-solid fa-box-open fa-4x"></i></div>
                    <h4 className="text-secondary fw-bold">No orders found</h4>
                    <p className="text-muted">Looks like you haven't placed any orders yet.</p>
                </div>
            )}
        </div>
    )
}

export default UserOrders