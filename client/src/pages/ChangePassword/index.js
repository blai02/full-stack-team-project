import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthChangePasswordForm from 'components/AuthChangePasswordForm';
import { signUpUser } from 'app/userSlice';
import { Link } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your email!'
        }
      ]
    }
  ];

  const onSubmit = data => {
    dispatch(signUpUser(data)).then(() => navigate('/confirmemail'));
  };
  return (
    <div>
      <AuthChangePasswordForm
        buttonText="Update password"
        onSubmit={onSubmit}
        title="Update your password"
        subtitle="Enter your email link, we will send you the recovery link"
        fields={fields}
      />
      <p>
        Already have an account? <Link to="/login">sign in</Link>
      </p>
    </div>
  );
}
