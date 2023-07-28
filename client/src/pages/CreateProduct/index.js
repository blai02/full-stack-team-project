import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Input, InputNumber, Typography } from 'antd';
import { createProductAction } from 'app/productSlice';
import { useParams } from 'react-router-dom';

export default function CreateProduct({ update = false }) {
  const { products, status } = useSelector(state => state.products);
  const { productId } = useParams();
  let initialValues = {};
  if (update) {
    initialValues = products.find((product) => productId === product._id) ?? {};
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onFinish(product) {
    if (update) {

    } else {
      dispatch(createProductAction(product)).then((result) => {
        if (result.type === 'products/createProduct/fulfilled') {
          navigate(`/products/${result.payload._id}`);
        }
      });
    }
  }

  return (
    <div>
      <Typography.Title>{update ? "Edit Product" : "Create Product"}</Typography.Title>
      <Form
        layout="vertical"
        style={{ maxWidth: '450px' }}
        initialValues={initialValues}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item label="Product name" name="name" rules={ [{ required: true }] }>
          <Input />
        </Form.Item>
        <Form.Item label="Product description" name="description" rules={ [{ required: true }] }>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={ [{ required: true }] }>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={ [{ required: true }] }>
          <InputNumber style={{width: '8rem'}} min={0} precision={2} controls={false} prefix="$" />
        </Form.Item>
        <Form.Item label="In Stock Quantity" name="inventory" rules={ [{ required: true }] }>
          <InputNumber min={0} precision={0} controls={false} />
        </Form.Item>
        <Form.Item label="Add Image Link" name="imgUrl" rules={ [{ required: true }] }>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={status === 'pending'}>{update ? "Edit Product" : "Add Product"}</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
