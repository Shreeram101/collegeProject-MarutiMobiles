import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createUserAsync } from '../authSlice'

const Signup = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addUser = (data) => {
    dispatch(createUserAsync(data))
  }

  return (

    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card border-0 shadow-lg p-4 rounded-4 fade-in-up" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <h3 className='fw-bold mb-1'><span className='text-primary'>MARUTI</span> MOBILES</h3>
          <p className="text-secondary small">Join our community today.</p>
        </div>

        <h4 className='text-center fw-bold mb-4 text-dark'>Create Account</h4>

        <form onSubmit={handleSubmit(addUser)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold small text-secondary">
              Email Address
            </label>
            <input
              className='form-control form-control-lg bg-light border-0'
              type='email'
              placeholder="name@example.com"
              {...register("email", {
                required: 'Email is required',
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: 'Please enter a valid email',
                },
              })}
            />
            {errors.email && (
              <p className='text-danger small mt-1'>{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold small text-secondary">
              Password
            </label>
            <input
              className='form-control form-control-lg bg-light border-0'
              type='password'
              placeholder="••••••••"
              {...register("password", {
                required: 'Password is required'
              })}
            />
            {errors.password && (
              <p className="text-danger small mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label fw-semibold small text-secondary">
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              className='form-control form-control-lg bg-light border-0'
              type='password'
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: 'Please confirm your password',
                validate: (value, formValues) =>
                  value === formValues.password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && (
              <p className="text-danger small mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button type='submit' className='btn btn-primary-custom w-100 mb-3 shadow-md py-2'>
            Sign Up
          </button>

          <div className="text-center border-top pt-3">
            <p className="small text-muted mb-0">Already a Member?</p>
            <Link to={'/login'} className='text-primary fw-bold text-decoration-none'>
              Log In here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup