import { createContext, useEffect, useReducer } from "react";
import { productReducer } from "../reducers/productReducer";
import { instance } from "../services";

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })();
  }, []);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
