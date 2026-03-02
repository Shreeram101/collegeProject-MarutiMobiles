import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, selectOrders, updateOrderAsync } from '../../Order/OrderSlice';

const AdminOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);

    useEffect(() => {
        dispatch(fetchAllOrdersAsync({}))
    }, [dispatch]);

    const handleUpdateStatus = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-warning bg-opacity-10 text-warning border-warning';
            case 'dispatched': return 'bg-info bg-opacity-10 text-info border-info';
            case 'delivered': return 'bg-success bg-opacity-10 text-success border-success';
            case 'cancelled': return 'bg-danger bg-opacity-10 text-danger border-danger';
            default: return 'bg-secondary text-white';
        }
    }

    return (
        <div className="fade-in-up">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">Order Management</h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => dispatch(fetchAllOrdersAsync({}))}>
                    <i className="fa-solid fa-arrows-rotate me-2"></i> Refresh
                </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-secondary small text-uppercase">
                            <tr>
                                <th className="ps-4 py-3">Order ID</th>
                                <th className="py-3">Items</th>
                                <th className="py-3">Total Amount</th>
                                <th className="py-3">Shipping Address</th>
                                <th className="py-3">Status</th>
                                <th className="py-3 text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="ps-4 fw-bold">#{order.id}</td>
                                    <td>
                                        <div className="d-flex flex-column gap-1">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="d-flex align-items-center">
                                                    <div className="bg-light rounded p-1 me-2" style={{ width: '30px', height: '30px' }}>
                                                        <img src={require(`../../../uploads/${item.product.avatar}`)} alt="" className="w-100 h-100 object-fit-contain" />
                                                    </div>
                                                    <small className="text-dark">{item.product.title} (x{item.qty})</small>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="fw-bold text-primary">${order.subtotal}</td>
                                    <td className="small text-secondary" style={{ maxWidth: '200px' }}>
                                        <div className="fw-bold text-dark">{order.selectedAddress.fullname}</div>
                                        {order.selectedAddress.streetaddress}, {order.selectedAddress.city}
                                        <div className="mt-1"><i className="fa-solid fa-phone me-1"></i> {order.selectedAddress.phone}</div>
                                    </td>
                                    <td>
                                        {editableOrderId === order.id ? (
                                            <select
                                                className="form-select form-select-sm border-primary shadow-none"
                                                onChange={(e) => handleUpdateStatus(e, order)}
                                                defaultValue={order.status}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="dispatched">Dispatched</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        ) : (
                                            <span className={`badge border ${getStatusColor(order.status)} px-3 py-2 rounded-pill`}>
                                                {order.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-end pe-4">
                                        <button
                                            className="btn btn-light btn-sm rounded-circle shadow-sm hover-primary"
                                            onClick={() => setEditableOrderId(order.id === editableOrderId ? -1 : order.id)}
                                            title="Edit Status"
                                        >
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminOrders