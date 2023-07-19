import React from 'react';
import { Button, InputNumber, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function CartItem() {
    return (
        <Space.Compact>
            <Button><MinusOutlined /></Button>
            <InputNumber controls={false}></InputNumber>
            <Button><PlusOutlined /></Button>
        </Space.Compact>
    );
}