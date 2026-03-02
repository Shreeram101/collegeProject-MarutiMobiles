import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrders from '../features/user/Components/UserOrders'

const UserOrdersPage = () => {

    return (
        <div>
            <Navbar />
            <h1 className='text-center mt-4'>My Orders</h1>
            <UserOrders></UserOrders>
        </div>
    )
}

export default UserOrdersPage