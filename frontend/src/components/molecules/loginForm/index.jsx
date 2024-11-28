import Form from "../form";
import Button from "../../atoms/button";
import { LoginApi } from "../../../apiEndpoints/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveLogin } from "../../../redux/slices/userSlice";
import { useForm } from "react-hook-form";
import emailIcon from "/icons/email.png";
import passwordIcon from "/icons/padlock.png";
import "../../organisms/auth/index.scss";
import CustomCheckBox from "../../atoms/checkbox";

const LoginForm = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await LoginApi(data);
      const { email, userID, imageUrl, token } = response;

      dispatch(saveLogin({ email, userID, imageUrl, token }));
      navigate("/chats");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form
      autoComplete="off"
      className="m-loginForm"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="m-loginForm__title">Log in to Your Account</h2>
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
        isPassword={true}
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

      <div className="m-loginForm__forgotPasswordContainer">
        <CustomCheckBox option="Keep me logged in" />
        <p className="m-loginForm__forgotPassword">Forgot password?</p>
      </div>

      <Button
        type="submit"
        padding="10"
        backgroundColor="white"
        borderRadius="2"
        width="100"
        value={"Log in"}
      />

      <div className="m-loginForm__linkContainer">
        <p>Don&apos;t have an account?</p>
        <p className="m-loginForm__link" onClick={onSwitch}>
          Sign up
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
