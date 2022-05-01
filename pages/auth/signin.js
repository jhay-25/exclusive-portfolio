import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import authService from "../../services/auth.service";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ username, password }, e) => {
    const user = await authService.signin({ username, password });

    if (user.error) {
      return console.log(user.error);
    }

    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    e.target.reset();
  };

  return (
    <div>
      <ul>
        {errors?.username && <li>{errors.username?.message}</li>}
        {errors?.password && <li>{errors.password?.message}</li>}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username")}
          name="username"
          placeholder="username"
        />
        <input
          type="password"
          {...register("password")}
          name="password"
          placeholder="password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default signin;
