import React, { useState } from 'react';
import '../../styles/AdminDashboard.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 12, status: 'Active' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', orders: 2, status: 'Blocked' },
    ]);

    const toggleStatus = (id) => {
        setCustomers(prev => prev.map(c =>
            c.id === id ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c
        ));
    };

    return (
        <div className="customer-list-page">
            <div className="page-header" style={{ marginBottom: '20px' }}>
                <h2>Customers</h2>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Orders</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(c => (
                            <tr key={c.id}>
                                <td style={{ fontWeight: 600 }}>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.orders}</td>
                                <td>
                                    <span className={`badge ${c.status === 'Active' ? 'delivered' : 'pending'}`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        style={{ color: c.status === 'Active' ? 'red' : 'green' }}
                                        onClick={() => toggleStatus(c.id)}
                                    >
                                        {c.status === 'Active' ? 'Block' : 'Unblock'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;
