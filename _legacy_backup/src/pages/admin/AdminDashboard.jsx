import React from 'react';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p className="stat-value">₹1,24,50,000</p>
                    <span className="stat-trend positive">+12% vs last month</span>
                </div>
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p className="stat-value">1,240</p>
                    <span className="stat-trend positive">+5% vs last month</span>
                </div>
                <div className="stat-card">
                    <h3>Active Products</h3>
                    <p className="stat-value">45</p>
                    <span className="stat-trend neutral">0% vs last month</span>
                </div>
                <div className="stat-card">
                    <h3>Customers</h3>
                    <p className="stat-value">3,500</p>
                    <span className="stat-trend positive">+8% vs last month</span>
                </div>
            </div>

            <div className="recent-orders admin-card">
                <h3>Recent Orders</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#LUM-1023</td>
                            <td>John Doe</td>
                            <td>Oct 24, 2026</td>
                            <td><span className="badge pending">Pending</span></td>
                            <td>₹1,25,000</td>
                        </tr>
                        <tr>
                            <td>#LUM-1022</td>
                            <td>Jane Smith</td>
                            <td>Oct 23, 2026</td>
                            <td><span className="badge shipped">Shipped</span></td>
                            <td>₹45,000</td>
                        </tr>
                        <tr>
                            <td>#LUM-1021</td>
                            <td>Alice Johnson</td>
                            <td>Oct 22, 2026</td>
                            <td><span className="badge delivered">Delivered</span></td>
                            <td>₹85,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
