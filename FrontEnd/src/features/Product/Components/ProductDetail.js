import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByIdAsync, selectProductById } from '../ProductSlice'
import { useParams } from 'react-router-dom'
import { addToCartAsync } from '../../Cart/cartSlice'
import { selectLoggedInUser } from '../../auth/authSlice'
import { addToWishlistAsync, selectWishlistItems } from '../../Wishlist/WishlistSlice'
import { Slide, toast } from 'react-toastify'

const ProductDetail = () => {
    const [qty, setQty] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0); // For UI state

    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const selectedproduct = useSelector(selectProductById);
    const wishlistItems = useSelector(selectWishlistItems);

    // Mock colors for demo - you might get this from backend
    const colors = ['#1f2937', '#dc2626', '#2563eb', '#16a34a'];

    useEffect(() => {
        dispatch(fetchProductByIdAsync(id))
    }, [dispatch, id])

    const handleCart = (e) => {
        e.preventDefault();
        const item = { product: selectedproduct.id, user: user.id, qty }
        dispatch(addToCartAsync(item))
    }

    const handleWishlist = (e) => {
        e.preventDefault();

        // 1. Check karein ki product pehle se wishlist me hai ya nahi
        // Backend se item.product populate hoke aata hai, isliye item.product.id match karenge
        const isItemAlreadyInWishlist = wishlistItems.some(
            (item) => item.product.id === selectedproduct.id || item.product === selectedproduct.id
        );

        if (isItemAlreadyInWishlist) {
            toast.warning(`⚠️ ${selectedproduct.title} is already in your Wishlist!`, {
                position: "bottom-left",
                transition: Slide, 
                theme: "colored",
                autoClose: 3000,
            });
            return;
        }

        // 3. Agar nahi hai, to normally add karein
        const items = { product: selectedproduct.id, user: user.id, qty };
        dispatch(addToWishlistAsync(items));

        // Success Message
        toast.success(`💖 Awesome! ${selectedproduct.title} is saved to your Wishlist!`, {
            position: "bottom-left",
            transition: Slide,
            theme: "colored",
            autoClose: 3000,
            icon: "🛍️"
        });
    }

    const decrement = () => {
        if (qty > 1) setQty((q) => q - 1)
    }

    const increment = () => {
        setQty((q) => q + 1)
    }

    return (
        <>
            {selectedproduct && (
                <div className="container py-5 fade-in-up">
                    <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                        <div className="row g-0">
                            {/* Product Image Section */}
                            <div className="col-lg-6 bg-light d-flex align-items-center justify-content-center p-5">
                                {selectedproduct.avatar && (
                                    <img
                                        src={require(`../../../uploads/${selectedproduct.avatar}`)}
                                        alt={selectedproduct.title}
                                        className='img-fluid shadow-sm rounded'
                                        width={300}
                                    // style={{maxHeight: '500px', objectFit: 'contain'}}
                                    />
                                )}
                            </div>

                            {/* Product Details Section */}
                            <div className="col-lg-6 p-5 bg-white">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h2 className='fw-bold text-dark mb-2'>{selectedproduct.title}</h2>
                                    <span className="badge bg-primary-subtle text-primary fs-6 px-3 py-2 rounded-pill">
                                        In Stock
                                    </span>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <div className="text-warning me-2">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`fa-solid fa-star ${i < Math.round(selectedproduct.rating) ? '' : 'text-muted opacity-25'}`}></i>
                                        ))}
                                    </div>
                                    <span className='text-secondary fw-semibold'>({selectedproduct.rating} Reviews)</span>
                                </div>

                                <h3 className='display-6 fw-bold text-primary mb-4'>
                                    ₹{selectedproduct.price}
                                </h3>

                                <p className='text-secondary lead mb-5' style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                                    {selectedproduct.description}
                                </p>

                                {/* Options Wrapper */}
                                <div className="p-4 bg-light rounded-3 mb-4">
                                    <div className="row g-4">
                                        {/* Colors */}
                                        <div className="col-md-6">
                                            <label className="fw-bold text-dark mb-2 d-block">Select Color</label>
                                            <div className="d-flex gap-3">
                                                {colors.map((color, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`color-option ${selectedColor === idx ? 'selected' : ''}`}
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => setSelectedColor(idx)}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-md-6">
                                            <label className="fw-bold text-dark mb-2 d-block">Quantity</label>
                                            <div className="quantity-wrapper">
                                                <button className="quantity-btn-modern" onClick={decrement}>
                                                    <i className="fas fa-minus fs-6"></i>
                                                </button>
                                                <input type="number" readOnly className="quantity-input-modern" value={qty} />
                                                <button className="quantity-btn-modern" onClick={increment}>
                                                    <i className="fas fa-plus fs-6"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 d-md-flex mt-4">
                                    <button
                                        onClick={handleCart}
                                        className='btn btn-primary-custom flex-grow-1 shadow-lg'
                                    >
                                        <i className="fa-solid fa-cart-shopping me-2"></i>
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleWishlist}
                                        className='btn btn-outline-secondary px-4 fw-bold border-2'>
                                        <i className="fa-regular fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductDetail