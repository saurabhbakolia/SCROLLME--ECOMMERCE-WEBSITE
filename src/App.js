import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import { lazy, Suspense } from 'react';
const LazyAllProducts = lazy(() => import('./pages/AllProducts'));
const LazyCategoryProducts = lazy(() => import('./pages/CategoryProducts'));

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/cart"
					element={
						<ProtectedRoute>
							<Cart />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/products"
					element={
						<Suspense fallback="Loading...">
							<LazyAllProducts />
						</Suspense>
					}
				/>
				<Route
					path="/:categorySlug"
					element={
						<Suspense fallback="Loading...">
							<LazyCategoryProducts />
						</Suspense>
					}
				/>
				<Route path="/:categorySlug/:productId" element={<Product />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<h1>404 Not Found</h1>} />
			</Routes>
		</div>
	);
}

export default App;
