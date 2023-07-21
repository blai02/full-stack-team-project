import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAction, updateCart } from '../../app/cartSlice';
import { Col, Row, Alert, Button, Divider, Image, InputNumber, List, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { USDollar } from '../../pages/Format';

const minValue = 1;
const maxValue = 999;

export default function Cart() {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartAction());
    }, []);

    const decrement = (productId) => () => cartState.cart[productId].count > minValue
        && dispatch(updateCart(productId, cartState.cart[productId].count - 1));
    const increment = (productId) => () => cartState.cart[productId].count < maxValue
        && dispatch(updateCart(productId, cartState.cart[productId].count + 1));
    const onChange = (productId) => (newValue) => dispatch(updateCart(productId, newValue));
    const remove = (productId) => () => dispatch(updateCart(productId, 0));
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                loading={cartState.status === 'pending'}
                dataSource={Object.values(cartState.cart)}
                renderItem={(item, idx) => (
                    <>
                        <Row>
                            <Col span={8}>
                                <Image src={item.product.imgUrl} />
                            </Col>
                            <Col span={12}>
                            <List.Item
                                actions={
                                    [<Space.Compact>
                                        <Button onClick={decrement(item.product._id)}><MinusOutlined /></Button>
                                        <InputNumber
                                        onChange={onChange(item.product._id)}
                                        style={{'max-width': '25%'}}
                                        min={minValue}
                                        max={maxValue}
                                        precision={0}
                                        status={item.count > item.product.inventory ? 'error' : null}
                                        value={item.count}
                                        controls={false} />
                                        <Button onClick={increment(item.product._id)}><PlusOutlined /></Button>
                                    </Space.Compact>,
                                    <Button onClick={remove(item.product._id)} type="link">remove</Button>]
                                }
                            >
                                <List.Item.Meta
                                    title={item.product.name}
                                />
                            </List.Item>
                            {item.count > item.product.inventory ? <Alert message={`not enough inventory, only ${item.product.inventory} left in stock`} type="error" /> : ''}
                            </Col>
                            <Col span={4}>
                                <p>{USDollar.format(item.product.price)}</p>
                            </Col>
                        </Row>
                        <Divider />
                    </>
                )}
            />
        </>
    );
}