import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProductProvider } from "./contexts/ProductContext";
import ProductTable from "./pages/ProductTable";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductTable />} />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
