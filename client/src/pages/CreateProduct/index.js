import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateProductForm from 'components/CreateProductForm';
import { signUpUser } from 'app/userSlice';
import { Link } from 'react-router-dom';

export default function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fields = [
    {
      placeholder: 'Product name',
      name: 'name',
      type: 'text',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your product name!'
        }
      ]
    },
    {
      placeholder: 'Product Description',
      name: 'description',
      type: 'text',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your product description!'
        }
      ]
    },    
    {
      placeholder: 'Category',
      name: 'category',
      type: 'dropdown',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please select your category!'
        }
      ]
    },
    {
      placeholder: 'Price',
      name: 'name',
      type: 'text',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your product name!'
        }
      ]
    },
    {
      placeholder: 'In Stock Quantity',
      name: 'quant',
      type: 'text',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your product name!'
        }
      ]
    },
    {
      placeholder: 'Add image Link',
      name: 'image',
      type: 'text',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your product name!'
        }
      ]
    },
  ];

  const onSubmit = data => {
    dispatch(signUpUser(data)).then(() => navigate('/confirmemail'));
  };
  return (
    <div>
      <CreateProductForm
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
