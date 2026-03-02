import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminPanel from './features/adminpanel/AdminPanel.js';
import InsertProductPage from './pages/InsertProductPage.js';
import SignUpPage from './pages/SignUpPage.js';
import Dashboard from './features/adminpanel/components/Dashboard.js';
import AdminProductList from './features/adminpanel/Products/AdminProductList.js';
import UpdateProduct from './features/adminpanel/Products/UpdateProduct.js';
import InsertCategory from './features/adminpanel/Categories/InsertCategory.js';
import AdminCategoryList from './features/adminpanel/Categories/AdminCategoryList.js';
import ProductDetailPage from './pages/ProductDetailPage.js';
import LoginPage from './pages/LoginPage.js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';
import Protected from './features/auth/components/Protected.js';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin.js';
import Logout from './features/auth/components/Logout.js';
import ProfileUserPage from './pages/ProfileUserPage.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice.js';
import { fetchItemsByUserIdAsync } from './features/Cart/cartSlice.js';
import CartPage from './pages/CartPage.js';
import Productlist from './features/Product/Components/Productlist.js';
import CheckOut from './pages/CheckOut.js';
import { fetchLoggedInUserAsync } from './features/user/userSlice.js';
import SuccessOrder from './pages/SuccessOrder.js';
import Order from './features/Order/Order.js';
import AdminOrders from './features/adminpanel/components/AdminOrders.js';
import UserOrdersPage from './pages/UserOrdersPage.js';
import Main from './features/Product/Components/Main.js';
import PageNotFound from './pages/404.js';
import CheckOutForm from './pages/CheckOutForm.js';
import StripeCheckOut from './pages/StripeCheckOut.js';
import AboutPage from './pages/AboutPage.js';
import ContactUsPage from './pages/ContactUsPage.js';
import Wishlist from './features/Wishlist/Wishlist.js';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([

  {
    path: '/',
    element: (
      <Main></Main>
    )
  },

  {
    path: '/products',
    element: (
      <Protected>
        <Productlist></Productlist>
      </Protected>
    )
  },

  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    )
  },

  {
    path: '/adminpanel',
    element: (
      <ProtectedAdmin>
        <AdminPanel>
          <AdminProductList></AdminProductList>
        </AdminPanel>
      </ProtectedAdmin>
    )
  },

  {
    path: '/checkout',
    element: (
      <Protected>
        <CheckOut></CheckOut>
      </Protected>
    )
  },

  {
    path: '/checkoutform',
    element: (
      <Protected>
        <CheckOutForm></CheckOutForm>
      </Protected>
    )
  },

  {
    path: '/stripe-checkout/',
    element: (
      <Protected>
        <StripeCheckOut></StripeCheckOut>
      </Protected>
    )
  },

  {
    path: '/signup',
    element: (
      <SignUpPage></SignUpPage>
    )
  },

  {
    path: '/dashboard',
    element: (
      <AdminPanel>
        <Dashboard></Dashboard>
      </AdminPanel>
    )
  },

  {
    path: '/profile',
    element: (
      <Protected>
        <ProfileUserPage></ProfileUserPage>{' '}
      </Protected>
    )
  },

  {
    path: '/adminorders',
    element: (
      <ProtectedAdmin>
        <AdminPanel>
          <AdminOrders></AdminOrders>
        </AdminPanel>
      </ProtectedAdmin>
    )
  },

  {
    path: '/my-orders',
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>{' '}
      </Protected>
    )
  },

  {
    path: '/adminproductlist',
    element: (
      <AdminPanel>
        <AdminProductList></AdminProductList>
      </AdminPanel>
    )
  },

  {
    path: '/updateproduct/:id',
    element: (
      <AdminPanel>
        <UpdateProduct></UpdateProduct>
      </AdminPanel>
    )
  },

  {
    path: '/insertproduct',
    element: (
      <AdminPanel>
        <InsertProductPage></InsertProductPage>
      </AdminPanel>
    )
  },

  {
    path: '/admincategorylist',
    element: (
      <AdminPanel>
        <AdminCategoryList></AdminCategoryList>
      </AdminPanel>
    )
  },

  {
    path: '/insertcategory',
    element: (
      <AdminPanel>
        <InsertCategory></InsertCategory>
      </AdminPanel>
    )
  },

  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    )
  },

  {
    path: '/login',
    element: (
      <LoginPage></LoginPage>
    )
  },

  {
    path: '/userprofile',
    element: (
      <ProfileUserPage></ProfileUserPage>
    )
  },

  {
    path: '/signup',
    element: (
      <SignUpPage></SignUpPage>
    )
  },

  {
    path: '/logout',
    element: (
      <Logout></Logout>
    )
  },

  {
    path: '/order-success/:id',
    element: (
      <Protected>
        <SuccessOrder></SuccessOrder>{' '}
      </Protected>
    )
  },

  {
    path: '/forgot-password',
    element: (
      <ForgotPasswordPage></ForgotPasswordPage>
    )
  },

  {
    path: '/order',
    element: (
      <Protected>
        <Order></Order>
      </Protected>
    )
  },

  {
    path: '/wishlist',
    element: (
      <Protected>
        <Wishlist></Wishlist>
      </Protected>
    )
  },

  {
    path: '/about',
    element: (
      <Protected>
        <AboutPage></AboutPage>
      </Protected>
    )
  },

  {
    path: '/contact',
    element: (
      <Protected>
        <ContactUsPage></ContactUsPage>
      </Protected>
    )
  },

  {
    path: '*',
    element: (
      <PageNotFound></PageNotFound>
    )
  }
])

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user]);


  return (
    <>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="light" />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;