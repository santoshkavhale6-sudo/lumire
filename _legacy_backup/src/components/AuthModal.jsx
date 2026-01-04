import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useStore();

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        let result;
        if (isLogin) {
            result = login(email, password);
        } else {
            result = signup(name, email, password);
        }

        if (result.success) {
            onClose();
            // Reset form
            setName('');
            setEmail('');
            setPassword('');
        } else {
            setError(result.message || 'Authentication failed');
        }
    };

    return (
        <>
            <div className="auth-overlay" onClick={onClose}></div>
            <div className="auth-modal">
                <button className="auth-close" onClick={onClose}>&times;</button>
                <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && <p className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <p className="auth-footer">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </>
    );
};

export default AuthModal;
