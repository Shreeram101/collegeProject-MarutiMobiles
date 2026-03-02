import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { insertProductAsync } from '../../Product/ProductSlice'
import { useNavigate, Link } from 'react-router-dom'

const InsertProduct = () => {
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("avatar", avatar)
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("rating", data.rating)
        formData.append("category", data.category)
        formData.append("stock", data.stock)

        dispatch(insertProductAsync(formData));
        navigate('/adminproductlist');
    }

    const handleUploadImage = (event) => {
        setAvatar(event.target.files[0]);
    }

    const { register, handleSubmit } = useForm()

    return (
        <div className="container py-4 fade-in-up">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-lg rounded-4">
                        <div className="card-header bg-white border-0 pt-4 pb-0 text-center">
                            <h3 className='fw-bold text-primary'>Add New Product</h3>
                            <p className="text-secondary small">Fill in the details to create a new product listing.</p>
                        </div>
                        <div className="card-body p-5">
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Product Title</label>
                                        <input className='form-control form-control-lg bg-light border-0' {...register("title", { required: true })} placeholder="e.g. Samsung Galaxy S24" />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Description</label>
                                        <textarea className='form-control bg-light border-0' rows="4" {...register("description", { required: true })} placeholder="Product features and details..."></textarea>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Price ($)</label>
                                        <input type="number" className='form-control bg-light border-0' {...register("price", { required: true })} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Stock Quantity</label>
                                        <input type="number" className='form-control bg-light border-0' {...register("stock", { required: true })} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Category</label>
                                        <input className='form-control bg-light border-0' {...register("category", { required: true })} placeholder="e.g. Smartphone" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Rating</label>
                                        <input type="number" step="0.1" className='form-control bg-light border-0' {...register("rating", { required: true })} />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold text-uppercase small text-secondary">Product Image</label>
                                        <input className="form-control border-0 bg-light py-2" type="file" onChange={handleUploadImage} />
                                    </div>

                                    <div className="col-12 mt-4 d-flex gap-2">
                                        <button type='submit' className='btn btn-primary-custom flex-grow-1 shadow-sm py-3'>Publish Product</button>
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

export default InsertProduct