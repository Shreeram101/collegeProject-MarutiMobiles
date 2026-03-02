import { ArrowLeftCircleIcon, ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetPasswordRequestAsync, selectMailSent } from '../authSlice'

const ForgotPassword = () => {

    const mailSent = useSelector(selectMailSent)
    console.log(mailSent);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <>
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <div className="card border-0 shadow-lg p-4 rounded-4 fade-in-up" style={{ width: '100%', maxWidth: '450px' }}>

                    <div className="text-center mb-4">
                        <h3 className='fw-bold mb-1'><span className='text-primary'>MARUTI</span> MOBILES</h3>
                        <p className="text-secondary small">No worries, we`ll send you reset instructions</p>
                    </div>

                    <form
                        noValidate
                        onSubmit={handleSubmit((data) => {
                            console.log(data);
                            dispatch(resetPasswordRequestAsync(data.email))
                        })}
                    >
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold small text-secondary">Email Address :</label>
                            <input
                                type="email"
                                className='form-control form-control-lg border-light bg-light'
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-danger small mt-1">{errors.email.message}</p>}
                            {mailSent && (
                                <p className="text-success small mt-1">Password reset instructions have been sent to your email.</p>
                            )}
                        </div>

                        <button type='submit' className='btn btn-primary-custom w-100 mb-3 shadow-md'>
                            Reset Password
                        </button>

                        <div className="d-flex justify-content-center align-items-center text-primary">
                            <ArrowLeftIcon width={20} className='me-1 fw-bold'></ArrowLeftIcon>
                            <Link
                                to={"/login"}
                                className='text-decoration-none fw-semibold'
                                style={{ fontSize: '14px' }}
                            >
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword