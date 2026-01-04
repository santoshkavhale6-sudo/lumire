import React from 'react';
import { useStore } from '../../context/StoreContext';
import '../../styles/AdminDashboard.css';

const OrderList = () => {
    const { orders, updateOrderStatus } = useStore();

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return 'badge pending';
            case 'Shipped': return 'badge shipped';
            case 'Delivered': return 'badge delivered';
            case 'Processing': return 'badge shipped';
            case 'Cancelled': return 'badge pending';
            default: return 'badge';
        }
    };

    const handleStatusChange = (id, newStatus) => {
        updateOrderStatus(id, newStatus);
    };

    return (
        <div className="order-list-page">
            <div className="page-header" style={{ marginBottom: '20px' }}>
                <h2>Orders</h2>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td style={{ fontWeight: '600' }}>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.date}</td>
                                <td>{order.items}</td>
                                <td>₹{order.total.toLocaleString('en-IN')}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.8rem' }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <button style={{ color: 'var(--color-primary)' }}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
