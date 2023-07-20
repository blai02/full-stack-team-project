import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAction } from '../../app/cartSlice';
import { Button, InputNumber, List, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const minValue = 1;
const maxValue = 999;

export default function Cart() {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const [value, setValue] = useState(0);

    useEffect(() => {
        dispatch(getCartAction());
    }, []);

    const decrement = () => value > minValue && setValue(value - 1);
    const increment = () => value < maxValue && setValue(value + 1);
    const onChange = (newValue) => setValue(newValue);
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                loading={cartState.status === 'pending'}
                dataSource={Object.values(cartState.cart)}
                renderItem={(item, idx) => (
                    <List.Item>
                        <p>{item.product.name}</p>
                        <Space.Compact>
                            <Button onClick={decrement}><MinusOutlined /></Button>
                            <InputNumber onChange={onChange} min={minValue} max={maxValue} precision={0} value={value} controls={false}></InputNumber>
                            <Button onClick={increment}><PlusOutlined /></Button>
                        </Space.Compact>
                    </List.Item>
                )}
            />
        </>
    );
}