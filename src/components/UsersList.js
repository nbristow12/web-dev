import React from 'react';

function UsersList({ users, loading, onRefresh }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderUsersList = () => {
    if (loading) {
      return <div className="loading">Loading users...</div>;
    }

    if (users.length === 0) {
      return <div className="loading">No users registered yet.</div>;
    }

    return users.map(user => (
      <div key={user.id} className="user-item">
        <h4>{user.name}</h4>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Birthday:</strong> {formatDate(user.birthday)}</p>
        <p><strong>Registered:</strong> {formatDate(user.created_at)}</p>
      </div>
    ));
  };

  return (
    <div className="users-section">
      <div className="users-header">
        <h3>Registered Users</h3>
        <button className="refresh-btn" onClick={onRefresh}>
          Refresh
        </button>
      </div>
      <div className="users-list">
        {renderUsersList()}
      </div>
    </div>
  );
}

export default UsersList;