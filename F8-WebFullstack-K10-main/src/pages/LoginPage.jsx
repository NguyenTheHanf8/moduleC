import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { instance } from "../services";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/authSchema";
const LoginPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const onSubmit = async (user) => {
    try {
      const { data } = await instance.post("/login", user);
      if (data.user && confirm("Đăng nhập thành công")) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
        nav("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login Form</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true })}
          />
          {errors?.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors?.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3 ">
          <button className="btn btn-primary w-100">Login</button>
        </div>
      </form>
    </>
  );
};
export default LoginPage;
