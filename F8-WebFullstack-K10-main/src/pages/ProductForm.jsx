import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "../schemas/authProduct";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { instance } from "../services";

const ProductForm = () => {
  const { id } = useParams();
  const { dispatch } = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  const onSubmit = async (product) => {
    if (id) {
      const { data } = await instance.patch(`/products/${id}`, product);
      dispatch({ type: "UPDATE_PRODUCT", payload: data });
    } else {
      const { data } = await instance.post("/products", product);
      dispatch({ type: "ADD_PRODUCT", payload: data });
    }

    reset({
      title: "",
      price: 0,
      description: "",
    });
  };
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products/${id}`);
      reset(data);
    })();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{id ? "Update " : "Add "}Product Form</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors?.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors?.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            {...register("description")}
          />
        </div>

        <div className="mb-3 ">
          <button className="btn btn-primary w-100">
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
