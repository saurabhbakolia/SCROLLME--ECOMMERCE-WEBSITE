import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './styles/global.css';
import useAuthCheck from './hooks/useAuthCheck';
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './pages/Home';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ContributorsPage from './pages/ContributorsPage';
import ContactUsPage from './pages/ContactUsPage';
import ComingSoon from './pages/ComingSoon';
import ForgotPassword from './pages/ForgotPassword';
import Admin from './components/admin/Admin';
import UpdateProduct from './components/UpdateProduct';
import AddNewProduct from './components/AddNewProduct';

const LazyAllProducts = lazy(() => import('./pages/AllProducts'));
const LazyCategoryProducts = lazy(() => import('./pages/CategoryProducts'));

const theme = createTheme();

function App() {
  useAuthCheck();

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/cart'
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path='/wishlist'
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path='/products'
            element={
              <Suspense fallback='Loading...'>
                <LazyAllProducts />
              </Suspense>
            }
          />
          <Route
            path='/:categorySlug'
            element={
              <Suspense fallback='Loading...'>
                <LazyCategoryProducts />
              </Suspense>
            }
          />
          <Route path='/contributors' element={<ContributorsPage />} />
          <Route path='/:categorySlug/:productId' element={<Product />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact-us' element={<ContactUsPage />} />
          <Route path='/comingsoon' element={<ComingSoon />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/update/:id' element={<UpdateProduct />} />
          <Route path='/admin/product/add' element={<AddNewProduct />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
