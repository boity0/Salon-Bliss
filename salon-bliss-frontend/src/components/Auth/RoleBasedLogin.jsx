import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiShield, FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import './RoleBasedLogin.css';

const RoleBasedLogin = () => {
  const [selectedRole, setSelectedRole] = useState('user');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Pre-defined accounts for easy access
  const roleAccounts = {
    admin: {
      email: 'admin@salon.com',
      password: 'admin123',
      description: 'Full access to manage orders, appointments, and system settings',
      color: '#ff6b9d'
    },
    user: {
      email: 'boitumelochantel04@gmail.com',
      password: 'password123',
      description: 'Book appointments, place orders, and manage personal profile',
      color: '#667eea'
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (roleAccounts[role]) {
      setCredentials({
        email: roleAccounts[role].email,
        password: roleAccounts[role].password
      });
    }
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(credentials.email, credentials.password);
    
    if (result.success) {
      const userRole = result.data.user.role;
      
      // Redirect based on role
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
    
    setLoading(false);
  };

  const selectedRoleData = roleAccounts[selectedRole];

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <div className="login-overlay"></div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome to Salon Bliss</h1>
            <p>Your premier destination for beauty and wellness</p>
          </div>

          {/* Role Selection */}
          <div className="role-selection">
            <h3>Select Your Role</h3>
            <div className="role-options">
              <button
                type="button"
                className={`role-option ${selectedRole === 'user' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('user')}
                style={{ '--role-color': roleAccounts.user.color }}
              >
                <div className="role-icon">
                  <FiUser />
                </div>
                <div className="role-info">
                  <h4>Customer</h4>
                  <p>Book appointments & shop products</p>
                </div>
              </button>

              <button
                type="button"
                className={`role-option ${selectedRole === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('admin')}
                style={{ '--role-color': roleAccounts.admin.color }}
              >
                <div className="role-icon">
                  <FiShield />
                </div>
                <div className="role-info">
                  <h4>Admin</h4>
                  <p>Manage orders & appointments</p>
                </div>
              </button>
            </div>
          </div>

          {/* Role Description */}
          {selectedRole && (
            <div className="role-description">
              <p>{selectedRoleData?.description}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
              style={{ backgroundColor: selectedRoleData?.color }}
            >
              {loading ? (
                <div className="login-spinner"></div>
              ) : (
                <>
                  {selectedRole === 'admin' ? <FiShield /> : <FiUser />}
                  Sign in as {selectedRole === 'admin' ? 'Admin' : 'Customer'}
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="demo-accounts">
            <h4>Demo Accounts</h4>
            <div className="demo-list">
              <div className="demo-account">
                <span className="demo-role admin">Admin</span>
                <span>admin@salon.com / admin123</span>
              </div>
              <div className="demo-account">
                <span className="demo-role customer">Customer</span>
                <span>boitumelochantel04@gmail.com / password123</span>
              </div>
            </div>
          </div>

          <div className="login-footer">
            <p>Don't have an account? <a href="/register">Sign up here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedLogin;