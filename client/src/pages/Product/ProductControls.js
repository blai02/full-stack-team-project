import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartMaxValue, updateCart } from "app/cartSlice";
import { deleteProductAction } from "app/productSlice";
import { Space, Button, Dropdown, InputNumber, Modal } from "antd";
import { DownOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function ProductControls({ productId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartState = useSelector((state) => state.cart);

    const { products, status } = useSelector((state) => state.products);
    const product = products.find((product) => (product._id === productId));

    const count = cartState.cart[productId]?.count ?? 0;

    const { user, isAuthenticated } = useSelector((state) => state.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    if (!product) {
        console.log("product does not exist");
        return <></>;
    }
    

    const decrement = () => count > 0 && dispatch(updateCart(productId, count - 1));
    const increment = () => count < cartMaxValue && dispatch(updateCart(productId, count + 1));
    const onChange = (newValue) => dispatch(updateCart(productId, newValue));
    const add = () => {
        if (!isAuthenticated)
            setIsLoginModalOpen(true);
        else
            increment();
    }

    const handleEdit = () => navigate(`/products/${productId}/edit`);
  
    const handleDelete = () => {
      dispatch(deleteProductAction(productId)).then(() => {
        setIsModalOpen(false);
      });
    };
    return (
        <Space direction="horizontal">
            {count ? (
                <Space.Compact>
                    <Button onClick={decrement}><MinusOutlined /></Button>
                    <InputNumber
                        onChange={onChange}
                        style={{ 'maxWidth': '4em' }}
                        min={0}
                        max={cartMaxValue}
                        precision={0}
                        status={count > product.inventory ? 'error' : null}
                        value={count}
                        controls={false} />
                    <Button onClick={increment}><PlusOutlined /></Button>
                </Space.Compact>
            ) : (
                <Button onClick={add} loading={cartState.isPending}>Add To Cart</Button>
            )}
            {isAuthenticated && product.vendor?._id === user.id ? (
                <Dropdown.Button
                    menu={{ items: [{ key: 'delete', label: 'Delete' }], onClick: () => setIsModalOpen(true) }}
                    onClick={handleEdit}
                    icon={<DownOutlined />}
                    loading={status === 'pending'}>
                    Edit
                </Dropdown.Button>
            ) : ''}
            <Modal
                title="Delete Confirm"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleDelete}
                confirmLoading={status === 'pending'}
            >
                <p>Are you sure you want to delete this product?</p>
            </Modal>
            <Modal
                title="Requires login"
                open={isLoginModalOpen}
                onCancel={() => setIsLoginModalOpen(false)}
                onOk={() => navigate('/login')}
                okText='Go to Login'
            >
                <p>Please login before adding to cart</p>
            </Modal>
        </Space>
    );
}