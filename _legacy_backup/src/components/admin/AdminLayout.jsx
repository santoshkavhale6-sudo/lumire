import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../../styles/AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>LUMIÈRE</h2>
                    <span>Admin Panel</span>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin" className={`nav-item ${isActive('/admin') ? 'active' : ''}`}>
                        Dashboard
                    </Link>
                    <Link to="/admin/products" className={`nav-item ${isActive('/admin/products') ? 'active' : ''}`}>
                        Products
                    </Link>
                    <Link to="/admin/orders" className={`nav-item ${isActive('/admin/orders') ? 'active' : ''}`}>
                        Orders
                    </Link>
                    <Link to="/admin/customers" className={`nav-item ${isActive('/admin/customers') ? 'active' : ''}`}>
                        Customers
                    </Link>
                    <Link to="/" className="nav-item">
                        Back to Store
                    </Link>
                </nav>
            </aside>

            <main className="admin-content">
                <header className="admin-header">
                    <h3>Dashboard</h3>
                    <div className="admin-user">
                        <span>Admin User</span>
                        <div className="avatar">A</div>
                    </div>
                </header>
                <div className="admin-page-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
