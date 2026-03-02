import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <>
            {/* <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 text-center error-template">

                        <div class="icon-box mb-3">
                            <i class="bi bi-cart-x"></i>
                        </div>

                        <div class="error-code">404</div>

                        <h2 class="fw-bold text-dark mb-3">Oops! Item Not Found</h2>
                        <p class="text-muted mb-4 lead">
                            The product or page you are looking for might have been removed or is temporarily unavailable.
                        </p>

                        <form class="mb-4 d-flex justify-content-center">
                            <div class="input-group w-75">
                                <input type="text" class="form-control form-control-lg" placeholder="Search for products..." />
                                <button class="btn btn-primary" type="button">
                                   
                                </button>
                            </div>
                        </form>

                        <div class="d-flex justify-content-center gap-2">
                            <a href="/" class="btn btn-dark btn-lg px-4 rounded-pill">
                                Back to Home
                            </a>
                            <a href="/contact" class="btn btn-outline-secondary btn-lg px-4 rounded-pill">
                                Contact Support
                            </a>
                        </div>

                    </div>
                </div>
            </div> */}

            <div className="bodys">
                <div class="container">
                    <div class="display-huge">404</div>
                    <div class="content-layer">
                        <h2 class="fw-light mb-4">This page has disappeared.</h2>
                        <p class="text-secondary mb-5">The URL may be misspelled or the product is no longer available.</p>
                        <Link to={'/'} class="btn btn-light rounded-pill px-5 py-3 fw-bold">CONTINUE SHOPPING</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound