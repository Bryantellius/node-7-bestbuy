import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sales from "./pages/sales";
import Home from "./pages/index";
import Product from "./pages/product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/products/:ProductID" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
