import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { getProductsAction } from "app/productSlice";
import { USDollar } from "../Format";
import { useMediaQuery } from "hooks/useMediaQuery";
import { Row, Col, Image, Skeleton, Space, Typography } from "antd";
import ProductControls from "./ProductControls";
import { getCartAction } from "app/cartSlice";

export default function ProductDetail() {
  const { productId } = useParams();
  const { products, status } = useSelector((state) => (state.products));
  const { isAuthenticated } = useSelector((state) => (state.user));
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch();
  if (status === 'idle') {
    dispatch(getProductsAction());
    if (isAuthenticated)
      dispatch(getCartAction());
    return <Skeleton />;
  }
  if (status === 'pending') {
    return <Skeleton />;
  }
  const product = products.find((product) => (product._id === productId));
  if (!product) {
    return <NotFound />;
  }
  return (
    <>
      <Row>
        <Col span={isMobile ? 24 : 12}><Image src={product.imgUrl} /></Col>
        <Col>
          <Space style={{padding: "2rem"}} direction="vertical" size="middle">
            <Typography.Text type="secondary">{product.category}</Typography.Text>
            <Typography.Title>{product.name}</Typography.Title>
            <Typography.Title level={2}>{USDollar.format(product.price)}</Typography.Title>
            <Typography.Text>{`Inventory: ${product.inventory ? product.inventory : 'Out of Stock'}`}</Typography.Text>
            <Typography.Text>{product.description}</Typography.Text>
            <ProductControls productId={productId} />
          </Space>
        </Col>
      </Row>
    </>
  );
}