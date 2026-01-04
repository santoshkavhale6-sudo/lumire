import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import '../styles/UserMenu.css';

const UserMenu = () => {
    const { user, logout } = useStore();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    return (
        <div className="user-menu-container" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
            </div>

            {isOpen && (
                <div className="user-dropdown">
                    <div className="user-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/profile" className="dropdown-item">My Profile</Link>
                    <Link to="/profile" className="dropdown-item">Orders</Link>
                    {user.role === 'admin' && (
                        <Link to="/admin" className="dropdown-item admin-link">Admin Panel</Link>
                    )}
                    <button onClick={logout} className="dropdown-item logout-btn">Sign Out</button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
