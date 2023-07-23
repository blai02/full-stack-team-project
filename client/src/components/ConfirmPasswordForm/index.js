import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import styles from './style.module.css';
import { MdSend } from 'react-icons/md'; 

export default function ConfirmPasswordFirm({
  buttonText,
  onSubmit,
  title,
  subtitle,
  fields,
  errors
}) {

  // return (
  //   <div className="container">
  //     <div className="email-icon">
  //       <MailOutlined />
  //     </div>
  //     <div className="text">
  //       <Title level={3}>We have sent the update password link to your email, please check that!</Title>
  //     </div>
  //   </div>
  // );
  return (
    <div className="mainDiv">
      <MdSend size={50}/> {/* Here you can change the size of the icon */}
      <p>We have sent the update password link to your email, please check that!</p>
    </div>
  );
}
