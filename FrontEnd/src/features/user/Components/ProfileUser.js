import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';
import Navbar from '../../Navbar/Navbar';
import User from '../../images/catagories/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'

const ProfileUser = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const handleEdit = (addressUpdate, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
        newUser.addresses.splice(index, 1, addressUpdate);
        dispatch(updateUserAsync(newUser));
        setSelectedEditIndex(-1);
    }

    const handleEditForm = (index) => {
        setSelectedEditIndex(index);
        const address = userInfo.addresses[index];
        Object.keys(address).forEach(key => setValue(key, address[key]));
    }

    const handleRemove = (e, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
        newUser.addresses.splice(index, 1);
        dispatch(updateUserAsync(newUser));
    }

    const AddressForm = ({ onSubmit, onCancel, isEdit = false }) => (
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3 bg-light p-4 rounded-3 shadow-sm fade-in-up">
            <div className="col-12 pb-2 border-bottom mb-3">
                <h5 className="fw-bold text-primary mb-1">{isEdit ? 'Edit Address' : 'Add New Address'}</h5>
                <small className="text-secondary">Please provide accurate shipping details.</small>
            </div>

            <div className="col-md-6">
                <label className="form-label fw-semibold small">Full Name</label>
                <input type="text" className="form-control" {...register('fullname', { required: true })} />
            </div>
            <div className="col-md-6">
                <label className="form-label fw-semibold small">Phone Number</label>
                <input type="tel" className="form-control" {...register('phone', { required: true })} />
            </div>
            <div className="col-12">
                <label className="form-label fw-semibold small">Email Address</label>
                <input type="email" className="form-control" {...register('emailaddress', { required: true })} />
            </div>
            <div className="col-12">
                <label className="form-label fw-semibold small">Street Address</label>
                <input type="text" className="form-control" {...register('streetaddress', { required: true })} />
            </div>
            <div className="col-md-5">
                <label className="form-label fw-semibold small">City</label>
                <input type="text" className="form-control" {...register('city', { required: true })} />
            </div>
            <div className="col-md-4">
                <label className="form-label fw-semibold small">State</label>
                <input type="text" className="form-control" {...register('state', { required: true })} />
            </div>
            <div className="col-md-3">
                <label className="form-label fw-semibold small">Pincode</label>
                <input type="text" className="form-control" {...register('Pincode', { required: true })} />
            </div>

            <div className="col-12 text-end mt-4">
                <button type="button" onClick={onCancel} className="btn btn-light me-2">Cancel</button>
                <button type="submit" className="btn btn-primary-custom px-4">{isEdit ? 'Update Address' : 'Save Address'}</button>
            </div>
        </form>
    );

    return (
        <>
            <Navbar />
            <div className="bg-light min-vh-100 pb-5">
                {/* Hero / Header Section */}
                <div className="bg-white shadow-sm mb-5">
                    <div className="container py-5 text-center">
                        <div className="d-inline-block p-1 rounded-circle border border-2 border-primary mb-3">
                            <img
                                src={User}
                                alt="Profile"
                                className="rounded-circle"
                                width="100" height="100"
                            />
                        </div>
                        <h2 className="fw-bold text-dark mb-1">{userInfo.name || 'Valued Customer'}</h2>
                        <p className="text-secondary mb-0">{userInfo.email}</p>
                    </div>
                </div>

                <div className="container">
                    <div className="row g-5">
                        {/* Sidebar / User Info */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
                                <div className="card-header bg-primary text-white py-3">
                                    <h5 className="mb-0 fw-bold"><i className="fa-solid fa-user me-2"></i> Account Details</h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        <label className="small text-muted text-uppercase fw-bold">Full Name</label>
                                        <p className="fw-semibold fs-5">{userInfo.name || 'N/A'}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small text-muted text-uppercase fw-bold">Email</label>
                                        <p className="fw-semibold fs-5">{userInfo.email}</p>
                                    </div>
                                    <div>
                                        <label className="small text-muted text-uppercase fw-bold">Role</label>
                                        <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill">
                                            {userInfo.role || 'User'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content / Addresses */}
                        <div className="col-lg-8">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold text-dark mb-0">Saved Addresses</h4>
                                {!showAddAddressForm && (
                                    <button
                                        className="btn btn-primary-custom shadow-sm"
                                        onClick={() => setShowAddAddressForm(true)}
                                    >
                                        <i className="fa-solid fa-plus me-2"></i>Add New
                                    </button>
                                )}
                            </div>

                            {/* Add Address Form */}
                            {showAddAddressForm && (
                                <div className="mb-5">
                                    <AddressForm
                                        onSubmit={(data) => {
                                            dispatch(updateUserAsync({ ...userInfo, addresses: [...userInfo.addresses, data] }));
                                            setShowAddAddressForm(false);
                                            reset();
                                        }}
                                        onCancel={() => setShowAddAddressForm(false)}
                                    />
                                </div>
                            )}

                            {/* Address List */}
                            <div className="row g-3">
                                {userInfo && userInfo.addresses.map((address, index) => (
                                    <div className="col-12" key={index}>
                                        {selectedEditIndex === index ? (
                                            <AddressForm
                                                isEdit
                                                onSubmit={(data) => handleEdit(data, index)}
                                                onCancel={() => setSelectedEditIndex(-1)}
                                            />
                                        ) : (
                                            <div className="card border-0 shadow-sm rounded-3 hover-shadow transition-normal">
                                                <div className="card-body p-4 d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <h5 className="fw-bold mb-0 me-3">{address.fullname}</h5>
                                                            <span className="badge bg-light text-secondary border">{address.type || 'Home'}</span>
                                                        </div>
                                                        <p className="text-secondary mb-1">
                                                            {address.streetaddress}, {address.city}, {address.state} - <b>{address.Pincode}</b>
                                                        </p>
                                                        <p className="text-secondary small mb-0">
                                                            <i className="fa-solid fa-phone me-2"></i>{address.phone}
                                                        </p>
                                                    </div>
                                                    <div className="d-flex flex-column gap-2">
                                                        <button
                                                            onClick={() => handleEditForm(index)}
                                                            className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleRemove(e, index)}
                                                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {userInfo.addresses.length === 0 && !showAddAddressForm && (
                                    <div className="text-center py-5">
                                        <div className="text-muted mb-3"><i className="fa-solid fa-map-location-dot fa-3x"></i></div>
                                        <h5 className="text-secondary">No addresses saved yet.</h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileUser