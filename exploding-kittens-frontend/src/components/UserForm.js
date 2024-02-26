// src/components/UserForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setCurrentUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import './UserForm.css'; // Import your CSS file

const UserForm = () => {
  const [username, setLocalUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      dispatch(setCurrentUser(existingUser));
      navigate('/game');
    } else {
      const currentUser = { username, points: 0 };
      dispatch(setCurrentUser(currentUser));

      const updatedUsers = [...users, currentUser];
      dispatch(setUsers(updatedUsers));

      setLocalUsername('');
      navigate('/game');
    }
  };

  return (
    <div className="user-form-container">
      <h2>Enter Your Username to Start the Game!</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setLocalUsername(e.target.value)}
          placeholder="Your Username"
          required
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default UserForm;
