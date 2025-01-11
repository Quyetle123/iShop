import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  Wrapper,
  FormLogin,
  FormHeading,
  FormBox,
  FormGroup,
  EyeIcon,
  Rules,
  LoginButton,
} from "./loginAndRegisterStyle";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [againPassword, setAgainPassword] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const role = 'user';

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    const id = uuidv4();
    if (
      (username === undefined ||
        password === undefined ||
        againPassword === undefined,
      email === undefined,
      city === undefined,
      address === undefined)
    ) {
      alert("Vui lòng nhập đủ thông tin để đăng kí");
    } else if (password !== againPassword) {
      alert("Mật khẩu nhập lại không đúng");
    } else if (!isChecked) {
      alert("Vui lòng chấp nhận điều khoản để đăng kí");
    } else {
        e.preventDefault();
        dispatch(registerStart({id, username, password, email, role, city, address}))
        navigate('/login');
    }
  };
  return (
    <Wrapper>
      <FormLogin>
        <FormHeading>Đăng kí</FormHeading>
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
              name="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeIcon>
              <i className="fa-solid fa-eye"></i>
            </EyeIcon>
          </FormGroup>
          <FormGroup>
            <i className="bx bxs-key"></i>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              onChange={(e) => setAgainPassword(e.target.value)}
            />
            <EyeIcon>
              <i className="fa-solid fa-eye"></i>
            </EyeIcon>
          </FormGroup>
          <FormGroup>
            <i className="bx bxs-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <i className="bx bx-location"></i>
            <input
              type="text"
              name="city"
              placeholder="Thành phố"
              onChange={(e) => setCity(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <i className="bx bx-map"></i>
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroup>
          <Rules>
            <label>
              <input
                type="radio"
                name="terms"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />{" "}
              Tôi chấp nhận điều khoản
            </label>
            <span>
              <a href="#">Đọc điều khoản</a>
            </span>
          </Rules>
          <LoginButton type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? 'Đăng kí...' : 'Đăng kí'}
          </LoginButton>
          {error && <p>{error}</p>}
        </FormBox>
      </FormLogin>
    </Wrapper>
  );
};

export default Register;
