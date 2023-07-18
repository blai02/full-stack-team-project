import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from 'components/AuthForm';
import { signUpUser } from 'app/userSlice';
import { Link } from 'react-router-dom';

export default function UpdatePass() {
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
    dispatch(signUpUser(data)).then(() => navigate('/login'));
  };
  return (
    <div>
      <AuthForm
        buttonText="Create account"
        onSubmit={onSubmit}
        title="Sign up an account"
        fields={fields}
      />
      <p>
        Already have an account? <Link to="/signin">sign in</Link>
      </p>
    </div>
  );
}
