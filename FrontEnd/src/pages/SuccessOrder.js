import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom';
import { resetCartAsync } from '../features/Cart/cartSlice';
import { resetOrder } from '../features/Order/OrderSlice';

const SuccessOrder = () => {
  const dispatch = useDispatch();
  const params = useParams(); 
  console.log(params);
   

  useEffect(() => {
    // Reset cart and current order state
    dispatch(resetCartAsync())
    dispatch(resetOrder())
  }, [dispatch])

  return (
    <>
      {/* Redirect if no Order ID is present */}
      {!params.id && <Navigate to={'/'} replace={true}></Navigate>}
      
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light fade-in-up">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card border-0 shadow-lg rounded-4 text-center overflow-hidden">
                <div className="card-body p-5">
                  
                  {/* Success Icon */}
                  <div className="mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle scale-in-center" style={{width: '80px', height: '80px'}}>
                      <i className="fa-solid fa-check fa-3x"></i>
                    </div>
                  </div>

                  {/* Heading */}
                  <h2 className="fw-bold text-dark mb-2">Order Confirmed!</h2>
                  <p className="text-secondary mb-4">Thank you for your purchase. Your order has been received and is being processed.</p>

                  {/* Order ID Box */}
                  <div className="bg-light p-3 rounded-3 mb-4 border border-secondary border-opacity-25 border-dashed">
                    <span className="text-uppercase small fw-bold text-secondary d-block mb-1">Order Number</span>
                    <span className="fs-4 fw-bold text-primary">#{params?.id}</span>
                  </div>

                  <p className="small text-muted mb-4">
                    You will receive an email confirmation shortly. You can track your order status in your account.
                  </p>

                  {/* Action Buttons */}
                  <div className="d-grid gap-2">
                    <Link to="/my-orders" className="btn btn-primary-custom shadow-sm py-2">
                      View Order Details
                    </Link>
                    <Link to="/" className="btn btn-light py-2 fw-semibold text-secondary">
                      Continue Shopping
                    </Link>
                  </div>

                </div>
                {/* Footer */}
                <div className="card-footer bg-white border-top py-3">
                    <small className="text-secondary">Need help? <span className="text-primary fw-bold cursor-pointer">Contact Support</span></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessOrder