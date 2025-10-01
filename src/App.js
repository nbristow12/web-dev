import React, { useState, useEffect } from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Load users from API
  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle user registration
  const handleUserRegistration = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage({ text: result.message, type: 'success' });
        loadUsers(); // Refresh the users list
        return { success: true };
      } else {
        setMessage({ text: result.error, type: 'error' });
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
      console.error('Error:', error);
      return { success: false, error: errorMessage };
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>User Registration</h1>
        <p>Please fill out the form to register</p>
      </div>

      <UserRegistrationForm 
        onSubmit={handleUserRegistration}
        message={message}
      />

      <UsersList 
        users={users}
        loading={loading}
        onRefresh={loadUsers}
      />
    </div>
  );
}

export default App;