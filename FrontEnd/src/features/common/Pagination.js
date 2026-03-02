import React from 'react'
import { ITEMS_PER_PAGE } from '../../app/constants'

const Pagination = ({ page, setPage, handlePage, totalItems }) => {

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    console.log(totalPages);

    return (
        <>
            {/* <div className="">
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-lg">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true"><i class="fa-solid fa-chevron-left"></i></span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true"><i class="fa-solid fa-chevron-right"></i></span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div> */}
        </>
    )
}

export default Pagination