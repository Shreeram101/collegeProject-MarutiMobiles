import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AdminPanel = ({ children }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-primary text-white shadow' : 'text-secondary hover-bg-light';
    }

    return (
        <div className="d-flex min-vh-100 bg-light">
            {/* Sidebar */}
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-white border-end position-fixed h-100" style={{ width: '280px', zIndex: 1000 }}>
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
                    <span className="fs-4 fw-bold text-dark px-2">ADMIN <span className="text-primary">PANEL</span></span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto gap-2">
                    <li className="nav-item">
                        <Link to="/dashboard" className={`nav-link d-flex align-items-center gap-2 ${isActive('/dashboard')}`}>
                            <i className="fa-solid fa-chart-line"></i> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminorders" className={`nav-link d-flex align-items-center gap-2 ${isActive('/adminorders')}`}>
                            <i className="fa-solid fa-box-open"></i> Orders & Dispatch
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminproductlist" className={`nav-link d-flex align-items-center gap-2 ${isActive('/adminproductlist')}`}>
                            <i className="fa-solid fa-tags"></i> Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/admincategorylist" className={`nav-link d-flex align-items-center gap-2 ${isActive('/admincategorylist')}`}>
                            <i className="fa-solid fa-layer-group"></i> Categories
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white me-2" style={{ width: '32px', height: '32px' }}>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <strong>Admin User</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to="/">View Site</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/logout">Sign out</Link></li>
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow-1" style={{ marginLeft: '280px' }}>
                <div className="container-fluid p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminPanel