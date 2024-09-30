import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../utils/token";
import { Account, HeaderTopContaier, MenuList } from "./style";
import { useDispatch } from "react-redux";
import { logoutStart } from "../../../reudux/slices/authSlice";

const HeaderTop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logoutStart());
    removeToken();
    navigate("/");
  };
  return (
    <HeaderTopContaier>
      <Account>Admin</Account>
      <MenuList onClick={handleLogOut} style={{ cursor: "pointer" }}>
        Đăng xuất
      </MenuList>
    </HeaderTopContaier>
  );
};

export default HeaderTop;
