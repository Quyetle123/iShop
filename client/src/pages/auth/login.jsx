import { Link, useNavigate } from "react-router-dom";
import {
  Wrapper,
  FormLogin,
  FormHeading,
  FormBox,
  FormGroup,
  EyeIcon,
  RememberForgot,
  LoginButton,
  DiffrentTitle,
  DiffrentLogin,
  LoginFacebook,
  LoginGoogle,
} from "./loginAndRegisterStyle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../../redux/slices/authSlice";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(loginStart({ username, password }));
  };

  useEffect(() => {
    if (role === "user") {
      navigate("/");
    } else if (role === "admin") {
      navigate("/admin");
    }
  }, [role, navigate]);
  return (
    <Wrapper>
      <FormLogin>
        <FormHeading>Đăng nhập</FormHeading>
        <FormBox>
          <FormGroup>
            <i className="bx bx-user"></i>
            <input
              type="text"
              name="user"
              placeholder="Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <i className="bx bxs-key"></i>
            <input
              type="password"
              name="pass"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeIcon>
              <i className="fa-solid fa-eye"></i>
            </EyeIcon>
          </FormGroup>
          <RememberForgot>
            <div>
              <input type="checkbox" name="" id="" />
              Lưu tài khoản
            </div>
            <span>Quên mật khẩu</span>
          </RememberForgot>
          <LoginButton onClick={handleSubmit}>Đăng nhập</LoginButton>
          <DiffrentTitle>
            --------------------- Lựa chọn khác ---------------------
          </DiffrentTitle>
          <DiffrentLogin>
            <LoginFacebook>Facebook</LoginFacebook>
            <LoginGoogle>Google</LoginGoogle>
          </DiffrentLogin>
          <RememberForgot>
            <p></p>
            <span>
              <Link className="no-underline text-white" to="/register">
                Đăng kí tài khoản
              </Link>
            </span>
          </RememberForgot>
        </FormBox>
      </FormLogin>
    </Wrapper>
  );
}

export default Login;
