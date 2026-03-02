import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editProductAsync, selectProductById, updateProductAsync } from '../../Product/ProductSlice';
import { useNavigate, useParams, Link } from 'react-router-dom';

const UpdateProduct = () => {
    const navigate = useNavigate()
    const product = useSelector(selectProductById);
    const dispatch = useDispatch();
    const { id } = useParams();

    const onsubmit = (data) => {
        const update = { ...data, id: id };
        dispatch(editProductAsync(update));
        navigate('/adminproductlist')
    }

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        dispatch(updateProductAsync(id))
    }, [dispatch, id])

    return (
        <div className="container py-4 fade-in-up">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-lg rounded-4">
                        <div className="card-header bg-white border-0 pt-4 pb-0 text-center">
                            <h3 className='fw-bold text-primary'>Update Product</h3>
                            <p className="text-secondary small">Editing: {product.title}</p>
                        </div>
                        <div className="card-body p-5">
                            <form onSubmit={handleSubmit(onsubmit)}>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Product Title</label>
                                        <input className='form-control form-control-lg bg-light border-0' defaultValue={product.title} {...register("title", { required: true })} />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Description</label>
                                        <textarea className='form-control bg-light border-0' rows="4" defaultValue={product.description} {...register("description", { required: true })}></textarea>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Price ($)</label>
                                        <input className='form-control bg-light border-0' defaultValue={product.price} {...register("price", { required: true })} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Rating</label>
                                        <input className='form-control bg-light border-0' defaultValue={product.rating} {...register("rating", { required: true })} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Category</label>
                                        <input className='form-control bg-light border-0' defaultValue={product.category} {...register("category", { required: true })} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Stock</label>
                                        <input className='form-control bg-light border-0' defaultValue={product.stock} {...register("stock", { required: true })} />
                                    </div>

                                    <div className="col-12 mt-4 d-flex gap-2">
                                        <button type='submit' className='btn btn-primary-custom flex-grow-1 shadow-sm py-3'>Save Changes</button>
                                        <Link to="/adminproductlist" className='btn btn-light flex-grow-1 py-3'>Cancel</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct