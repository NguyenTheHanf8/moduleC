import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { instance } from "../services";

const ProductTable = () => {
  const { state, dispatch } = useContext(ProductContext);
  const handleRemove = async (id) => {
    if (window.confirm("Bạn có chắc chắn không?")) {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "REMOVE_PRODUCT", payload: id });
    }
  };
  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Price</td>
            <td>Description</td>
            <td>Thumbnail</td>
            <td>Stock</td>
            <td>CategoryID</td>
          </tr>
        </thead>
        <tbody>
          {state.products &&
            state.products.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.thumbnail}</td>
                  <td>{item.stock}</td>
                  <td>{item.categoryId}</td>
                  <td>
                    <Link
                      className="btn btn-warning"
                      to={`/products/update/${item.id}`}
                    >
                      Cập nhật
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Link className="btn btn-primary" to={"/products/add"}>
        ADD NEW
      </Link>
    </div>
  );
};

export default ProductTable;
