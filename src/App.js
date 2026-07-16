import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";


function App() {

  return (

    <BrowserRouter>

      <CartProvider>

        <WishlistProvider>

          <AuthProvider>


           <ToastContainer position="top-right" autoClose={2500} />

        <Navbar />

          <Routes>

              <Route path="/"element={<Home />} />

              <Route path="/cart" element={<CartPage />}/>

              <Route path="/product/:id" element={<ProductDetails />} />

              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

              <Route path="/order-success" element={<OrderSuccess />}/>

              <Route path="/wishlist" element={<Wishlist />} />

              <Route path="/about" element={<About />} />

              <Route path="/contact" element={<Contact />}/>

              <Route path="/register" element={<Register />} />

              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>

              <Route path="/login" element={<Login />} />

              <Route path="/profile" element={<Profile />}/>

              <Route path="*"element={<NotFound />}/>

            </Routes>



            <Footer />


          </AuthProvider>


        </WishlistProvider>


      </CartProvider>


    </BrowserRouter>

  );

}


export default App;
