import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import CartItem from 'components/Cart/CartItem';
import RightMenu from './RightMenu';

import './style.css';
import { useMediaQuery } from 'hooks/useMediaQuery';

const TITLE = 'Management Chuwa';

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const isMobile = useMediaQuery('(max-width: 450px)');
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(!open);
  };

  const { pathname: location } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        {isMobile ? <HomeOutlined /> : TITLE}
      </Link>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <Button className="cartButton" type="text" onClick={showModal}>
            <ShoppingCartOutlined />
          </Button>
        ) : ''}
        <div className="rightMenu">
          <RightMenu mode="horizontal" />
        </div>

        <Modal
          className="cartModal"
          cancelText="Close"
          okText="Checkout"
          open={open}
          closeIcon={null}
          onCancel={showModal}>
          <CartItem />
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;
