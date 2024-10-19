import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import ContributorsPage from './pages/ContributorsPage';
import { lazy, Suspense } from 'react';
import ContactUsPage from './pages/ContactUsPage';
import Admin from './components/Admin';
const LazyAllProducts = lazy(() => import('./pages/AllProducts'));
const LazyCategoryProducts = lazy(() => import('./pages/CategoryProducts'));

function App() {
  return (
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
          path='/wishlist'
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
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
        <Route path='/register' element={<Register />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
