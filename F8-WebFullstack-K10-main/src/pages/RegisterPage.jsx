import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { instance } from "../services";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../schemas/authSchema";

const Register = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (user) => {
    try {
      const { data } = await instance.post("/register", user);
      if (
        data.user &&
        confirm("Đăng ký thành công, bạn muốn đăng nhập ngay bây giờ không ?")
      ) {
        nav("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register Form</h1>
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

        <div className="mb-3">
          <label htmlFor="confirm" className="form-label">
            Confirm
          </label>
          <input
            type="password"
            className="form-control"
            {...register("confirm", {
              required: true,
            })}
          />
          {errors?.confirm && (
            <p className="text-danger">{errors.confirm.message}</p>
          )}
        </div>

        <div className="mb-3 ">
          <button className="btn btn-primary w-100">Register</button>
        </div>
      </form>
    </>
  );
};

export default Register;
