import React from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    return (
        <div className="profile-page container">
            <h1>My Account</h1>
            <div className="profile-layout">
                <aside className="profile-sidebar">
                    <ul>
                        <li className="active">Dashboard</li>
                        <li>Orders</li>
                        <li>Addresses</li>
                        <li>Wishlist</li>
                        <li>Logout</li>
                    </ul>
                </aside>

                <main className="profile-content">
                    <h2>Welcome Back!</h2>
                    <p>From your account dashboard you can view your recent orders and manage your shipping and billing addresses.</p>

                    <div className="dashboard-stats">
                        <div className="stat-card">
                            <h3>Total Orders</h3>
                            <p>0</p>
                        </div>
                        <div className="stat-card">
                            <h3>Pending</h3>
                            <p>0</p>
                        </div>
                        <div className="stat-card">
                            <h3>Wishlist</h3>
                            <p>0</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
