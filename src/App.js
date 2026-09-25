import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";


import { ToastContainer } from "react-toastify";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <CartProvider>

        <WishlistProvider>

          <AuthProvider>

            <ToastContainer position="top-right" autoClose={2500}/>


            <Navbar />


            <Routes>

              <Route path="/" element={<Home />}/>


              <Route path="/cart" element={<CartPage />} />


              <Route path="/product/:id" element={<ProductDetails />} />


              <Route path="/orders/:id" element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />

              <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />


              <Route path="/order-success" element={<OrderSuccess />}/>


              <Route path="/wishlist" element={<Wishlist />}/>


              <Route path="/about" element={<About />}/>


              <Route path="/contact" element={<Contact />}/>


              <Route path="/register" element={<Register />}/>


              <Route path="/login" element={<Login />} />


              <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                 } 
                 />


              <Route path="*" element={<NotFound />} />

            </Routes>


            <Footer />


          </AuthProvider>

        </WishlistProvider>

      </CartProvider>

    </BrowserRouter>

  );

}


export default App;

