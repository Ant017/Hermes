import Form from "../form";
import Button from "../../atoms/button";
import { SignupApi } from "../../../apiEndpoints/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import userIcon from "/icons/user.png";
import emailIcon from "/icons/email.png";
import passwordIcon from "/icons/padlock.png";
import confirmPasswordIcon from "/icons/lock.png";
import "../../organisms/auth/index.scss";

const SignupForm = ({ onSwitch }) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await SignupApi(data);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <form
      autoComplete="off"
      className="m-signupForm"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="m-signupForm__title">Create a New Account</h2>
      <Form
        type="text"
        name="username"
        control={control}
        placeholder="Username"
        icon={userIcon}
        rules={{
          required: "Username is required",
        }}
        errors={errors}
      />
      <Form
        type="email"
        name="email"
        control={control}
        placeholder="Email"
        icon={emailIcon}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        errors={errors}
      />
      <Form
        type="password"
        name="password"
        control={control}
        placeholder="Password"
        icon={passwordIcon}
        rules={{
          required: "Password is required",
          pattern: {
            value: /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/,
            message:
              "Password must be at least 6 characters, contain at least one special characters and one number",
          },
        }}
        errors={errors}
      />
      <Form
        type="password"
        name="confirmPassword"
        control={control}
        placeholder="Confirm password"
        icon={confirmPasswordIcon}
        rules={{
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        }}
        errors={errors}
      />

      <Button
        type="submit"
        padding="10"
        backgroundColor="white"
        borderRadius="2"
        width="100"
        value={"Sign up"}
      />

      <div className="m-signupForm__linkContainer">
        <p>Already have an account?</p>
        <p className="m-signupForm__link" onClick={onSwitch}>
          Login
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
