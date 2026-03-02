import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteProductAsync, productAsync, selectAllProducts } from '../../Product/ProductSlice';
import { useEffect, useState } from 'react';

const AdminProductList = () => {
    const products = useSelector(selectAllProducts);
    const [del, setDel] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productAsync())
    }, [dispatch, del])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProductAsync(id))
            setDel((d) => d + 1)
        }
    }

    return (
        <div className="fade-in-up">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">Product Management</h2>
                <Link to="/insertproduct" className="btn btn-primary-custom shadow-sm">
                    <i className="fa-solid fa-plus me-2"></i>Add New Product
                </Link>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light text-secondary small text-uppercase">
                                <tr>
                                    <th className="ps-4 py-3">Product</th>
                                    <th className="py-3">Category</th>
                                    <th className="py-3">Price</th>
                                    <th className="py-3">Stock</th>
                                    <th className="py-3 text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="ps-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-light rounded p-2 me-3 d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px' }}>
                                                    {product.avatar ? (
                                                        <img
                                                            src={require(`./../../../uploads/${product.avatar}`)}
                                                            alt={product.title}
                                                            className='img-fluid'
                                                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                                        />
                                                    ) : (
                                                        <i className="fa-regular fa-image text-secondary"></i>
                                                    )}
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold text-dark">{product.title}</h6>
                                                    <small className="text-secondary">ID: {product.id}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge bg-light text-secondary border">{product.category}</span></td>
                                        <td className="fw-bold text-primary">${product.price}</td>
                                        <td>
                                            {product.stock > 0 ? (
                                                <span className="text-success fw-bold"><i className="fa-solid fa-check me-1"></i>{product.stock} in stock</span>
                                            ) : (
                                                <span className="text-danger fw-bold">Out of stock</span>
                                            )}
                                        </td>
                                        <td className="text-end pe-4">
                                            <Link
                                                to={`/updateproduct/${product.id}`}
                                                className='btn btn-light btn-sm rounded-circle me-2 shadow-sm hover-primary'
                                                title="Edit"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </Link>
                                            <button
                                                className='btn btn-light btn-sm rounded-circle shadow-sm hover-danger text-danger'
                                                onClick={() => handleDelete(product.id)}
                                                title="Delete"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProductList