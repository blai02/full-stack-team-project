import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Layout from 'components/Layout';
// import AuthLayout from 'components/Layout/AuthLayout';
import SignUp from './pages/SignUp';
import CartItem from './components/Cart/CartItem';
// import LogIn from 'pages/LogIn';
// import NotFound from 'pages/NotFound';
// import Home from 'pages/Home';
// import NewMessage from 'pages/Message/NewMessage';

function App() {
  return (

    // <BrowserRouter>
    //   <Routes>

    //         <Route path="signup" element={<SignUp />} />

    //   </Routes>
    // </BrowserRouter>
    <CartItem></CartItem>
  );
}

export default App;