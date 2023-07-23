import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmPasswordForm from 'components/ConfirmPasswordForm';
import { signUpUser } from 'app/userSlice';
import { Link } from 'react-router-dom';

export default function ConfirmEmail() {
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
      <ConfirmPasswordForm
        buttonText="Update password"
        onSubmit={onSubmit}
        title="We have sent the update password link to your email, please check that!"
        fields={fields}
      />
    </div>
  );
}
