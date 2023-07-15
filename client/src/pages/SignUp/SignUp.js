// SignUp.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../redux/actions/authActions';
import Form from './Form';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!username) formErrors.username = "Username cannot be empty";
    if (!password) formErrors.password = "Password cannot be empty";
    if (password !== confirmPassword) formErrors.confirmPassword = "Password and Confirm Password must match";
    if (password.length < 8) formErrors.password = "Password must be at least 8 characters long";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(signUpUser(username, password)).then(() => {
        // Navigate to the SignIn page after successful signup
        navigate('/signin');
      });
    }
  };

  return (
    <Form onSubmit={handleSignUp}>
      {/* Form fields for username, password and confirm password */}
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      {errors.username && <p>{errors.username}</p>}
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      {errors.password && <p>{errors.password}</p>}
      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      <button type="submit">Sign Up</button>
    </Form>
  );
};

export default SignUp;
