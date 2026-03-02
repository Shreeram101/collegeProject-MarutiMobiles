import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
// deleteFromWishlistAsync ko import me add karein
import { fetchWishlistByUserIdAsync, selectWishlistItems, deleteFromWishlistAsync } from './WishlistSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchWishlistByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  // id ke sath 'title' bhi receive karenge
  const handleRemove = (e, id, title) => {
    e.preventDefault();
    dispatch(deleteFromWishlistAsync(id));

    // ✨ NAYA FANCY TOAST MESSAGE ✨
    toast.error(`🗑️ ${title || 'Item'} removed from your Wishlist.`, {
      position: "bottom-right",
      theme: "colored", 
      autoClose: 2500,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 mt-4">
        <h2 className="mb-4 fw-bold text-center">My Wishlist <i className="fa-solid fa-heart text-danger"></i></h2>

        {items.length === 0 ? (
          <div className="text-center mt-5">
            <h4 className="text-muted">Your wishlist is currently empty.</h4>
            <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
          </div>
        ) : (
          <div className="row g-4">
            {items.map((item) => (
              <div className="col-md-4 col-lg-3" key={item.id || Math.random()}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                  <div className="bg-light p-4 d-flex justify-content-center align-items-center" style={{ height: '220px' }}>
                    {item?.product?.avatar ? (
                      <img
                        src={require(`../../uploads/${item.product.avatar}`)}
                        className="img-fluid"
                        alt={item.product.title || 'Product Image'}
                        style={{ maxHeight: '180px', objectFit: 'contain' }}
                      />
                    ) : (
                      <div className="text-muted">No Image Available</div>
                    )}
                  </div>

                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title text-truncate fw-bold mb-2">
                      {item?.product?.title || 'Unknown Product'}
                    </h5>
                    <p className="card-text text-primary fs-5 fw-bold mb-3">
                      ${item?.product?.price || '0'}
                    </p>

                    <div className="mt-auto">
                      {item?.product?.id && (
                        <Link to={`/product-detail/${item.product.id}`} className="btn btn-dark w-100 rounded-pill shadow-sm mb-2">
                          View Product
                        </Link>
                      )}

                      {/* YEH NAYA REMOVE BUTTON ADD KIYA HAI */}
                      <button
                        onClick={(e) => handleRemove(e, item.id, item?.product?.title)}
                        className="btn btn-outline-danger w-100 rounded-pill shadow-sm">
                        <i className="fa-solid fa-trash me-2"></i> Remove
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist;