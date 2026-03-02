import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { insertCategoryAsync } from '../../Product/ProductSlice'

const InsertCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        
        dispatch(insertCategoryAsync(data));
        navigate('/admincategorylist');
    }

    const { register, handleSubmit } = useForm()

    return (
        <div className="container py-5 fade-in-up">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card border-0 shadow-lg rounded-4">
                        <div className="card-header bg-white border-0 pt-4 text-center">
                            <h4 className="fw-bold text-primary">New Category</h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-uppercase small text-secondary">Category Name</label>
                                    <input className='form-control form-control-lg bg-light border-0' {...register("category", { required: true })} placeholder="e.g. Smartwatch" />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type='submit' className='btn btn-primary-custom py-2 shadow-sm'>Create Category</button>
                                    <Link to="/admincategorylist" className='btn btn-light py-2'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InsertCategory