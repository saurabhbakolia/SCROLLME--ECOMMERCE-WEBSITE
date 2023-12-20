import './App.css';
import Home from './pages/Home'
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './utils/ProtectedRoute';
import useAuthCheck from './hooks/useAuthCheck';
import CategoryProducts from './pages/CategoryProducts';
import AllProducts from './pages/AllProducts';


function App() {
  useAuthCheck();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/:categorySlug' element={<CategoryProducts />} />
        <Route path='/:categorySlug/:productId' element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
