import React from 'react'
import User from '../images/catagories/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectItems } from '../Cart/cartSlice'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
    const cartdata = useSelector(selectItems);

    return (
        <nav className="navbar navbar-expand-lg navbar-glass sticky-top py-3">
            <div className="container">
                <Link to={'/'} className='text-primary text-decoration-none fs-3 fw-bold'><span className='text-danger'>MARUTI</span> MOBILES</Link>
                <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4">
                        <li className="nav-item">
                            <NavLink
                                to="/products"
                                className={({ isActive }) => `nav-link fw-semibold ${isActive ? 'text-primary' : 'text-secondary'}`}
                            >
                                <span className='fs-5 me-1'>All Products</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/wishlist"
                                className={({ isActive }) => `nav-link fw-semibold ${isActive ? 'text-primary' : 'text-secondary'}`}
                            >
                                <span className='fs-5 me-1'>Wishlist</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className={({ isActive }) => `nav-link fw-semibold ${isActive ? 'text-primary' : 'text-secondary'}`}
                            >
                                <span className='fs-5 me-1'>About Us</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className={({ isActive }) => `nav-link fw-semibold ${isActive ? 'text-primary' : 'text-secondary'}`}
                            >
                                <span className='fs-5 me-1'>Contact Us</span>
                            </NavLink>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-4">
                        <Link to={'/cart'} className="position-relative text-dark transition-fast hover-scale">
                            <ShoppingCartIcon style={{ height: '28px' }} />
                            {cartdata.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                                    {cartdata.length}
                                </span>
                            )}
                        </Link>

                        <div className="dropdown">
                            <div
                                className="d-flex align-items-center gap-2 cursor-pointer dropdown-toggle hide-arrow"
                                data-bs-toggle="dropdown"
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={User}
                                    alt="user"
                                    className='rounded-circle shadow-sm object-fit-cover'
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <ul className='dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3 mt-2 p-2'>
                                <li><Link to={'/profile'} className='dropdown-item rounded-2 py-2'>My Profile</Link></li>
                                <li><Link to={'/my-orders'} className='dropdown-item rounded-2 py-2'>My Orders</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link to={'/logout'} className='dropdown-item rounded-2 py-2 text-danger'>Sign Out</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar