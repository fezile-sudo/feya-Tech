import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";


function App() {

  return (
    <BrowserRouter>

      <Navbar />

    <Routes>

  <Route 
    path="/" 
    element={<Home />} 
  />

  <Route 
    path="/cart" 
    element={<CartPage />} 
  />

  <Route
    path="/product/:id"
    element={<ProductDetails />}
  />

</Routes> 

    </BrowserRouter>
  );
}

export default App;
