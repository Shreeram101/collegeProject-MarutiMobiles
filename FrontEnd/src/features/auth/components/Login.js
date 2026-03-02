import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAsync, selectError, selectLoggedInUser } from '../authSlice'

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  if (user && user.role === 'admin') {
    navigate('/adminpanel')
  }

  return (
    <>
      {user && user.role === 'user' && <Navigate to='/' replace={true}></Navigate>}
      
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="card border-0 shadow-lg p-4 rounded-4 fade-in-up" style={{ width: '100%', maxWidth: '450px' }}>
          
          <div className="text-center mb-4">
            <h3 className='fw-bold mb-1'><span className='text-primary'>MARUTI</span> MOBILES</h3>
            <p className="text-secondary small">Welcome back! Please login to continue.</p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({
                  email: data.email,
                  password: data.password
                })
              )
            })}
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold small text-secondary">Email Address</label>
              <input
                type="email"
                className='form-control form-control-lg border-light bg-light'
                placeholder="name@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-danger small mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold small text-secondary">Password</label>
              <input
                type="password"
                className='form-control form-control-lg border-light bg-light'
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-danger small mt-1">{errors.password.message}</p>}
              {error && <p className="text-danger small mt-1">{error.message || error}</p>}
            </div>

            <button type='submit' className='btn btn-primary-custom w-100 mb-3 shadow-md'>
              Log In
            </button>

            <div className="text-center">
              <p className="small text-muted mb-2">Don't have an account?</p>
              <Link to={'/signup'} className='text-primary fw-bold text-decoration-none'>
                Create Account
              </Link>
              <div className="mt-2">
                <Link to={'/forgot-password'} className='small text-secondary text-decoration-none'>
                  Forgot Password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login