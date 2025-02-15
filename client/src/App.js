import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import AuthLayout from 'components/Layout/AuthLayout';
import SignUp from 'pages/SignUp';
import LogIn from 'pages/LogIn';
import NotFound from 'pages/NotFound';
import ChangePassword from 'pages/ChangePassword';
import ProductHome from 'pages/Product';
import ProductDetail from './pages/Product/ProductDetail';
import ConfirmEmail from 'pages/ConfirmEmail';
import CreateProduct from 'pages/CreateProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductHome />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="confirmpassword" element={<ConfirmEmail />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route element={<AuthLayout />}>
            <Route path="products/:productId/edit" element={<CreateProduct update={true} />} />
            <Route path="createproduct" element={<CreateProduct />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
