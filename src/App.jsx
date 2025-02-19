import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductInfo from "./components/ProductInfo";

const App = () => {
  return (
    <div className="dark:bg-slate-700 ">
      <div className="bg-slate-900">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductInfo />} />
      </Routes>
    </div>
  );
};

export default App;
