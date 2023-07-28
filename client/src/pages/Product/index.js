import React, { useEffect, useState } from 'react';
import { List, Avatar, Skeleton, Space, Button, Typography, Modal, Card, Image } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ProductControls from './ProductControls';
import { getProductsAction, deleteProductAction } from 'app/productSlice';
import styles from './style.module.css';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function MessageList() {
  const dispatch = useDispatch();
  const { products, status } = useSelector(state => state.products);
  const { user, isVendor } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        {isVendor ? (<Button onClick={() => navigate('createProduct')}>Add Product</Button>) : ''}
      </div>
      <List
        className={styles.list}
        size="large"
        loading={status === 'pending'}
        grid={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 12
        }}
        dataSource={products}
        renderItem={(item, idx) => (
          <List.Item>
            <Card title={item.name}>
              <Image src={item.imgUrl} />
              <ProductControls productId={item._id} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
