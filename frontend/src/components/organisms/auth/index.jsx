import "./index.scss";
import "../../atoms/cardFlip/index.scss";
import LoginForm from "../../molecules/loginForm";
import SignupForm from "../../molecules/signupForm";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../../atoms/cardFlip";
import { saveLoginPageState } from "../../../redux/slices/commonSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.common);

  const [flipped, setFlipped] = useState(false);

  const handleLogin = () => {
    dispatch(saveLoginPageState({ isLogin: true }));
    setFlipped(!flipped);
    navigate("/");
  };

  const handleSignup = () => {
    dispatch(saveLoginPageState({ isLogin: false }));
    setFlipped(!flipped);
    navigate("/signup");
  };

  return (
    <div className="o-auth">
      <CardWrapper flipped={flipped}>
        <div className="o-auth__form-container">
        {isLogin ? (
          <LoginForm onSwitch={handleSignup} />
        ) : (
          <SignupForm onSwitch={handleLogin} />
        )}
        </div>
      </CardWrapper>
    </div>
  );
};

export default Auth;
