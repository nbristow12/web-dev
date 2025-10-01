import React, { useState } from 'react';

function UserRegistrationForm({ onSubmit, message }) {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await onSubmit(formData);
    
    if (result.success) {
      // Clear form on success
      setFormData({
        name: '',
        birthday: '',
        email: ''
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthday">Birthday:</label>
          <input 
            type="date" 
            id="birthday" 
            name="birthday" 
            value={formData.birthday}
            onChange={handleInputChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register User'}
        </button>
      </form>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </>
  );
}

export default UserRegistrationForm;