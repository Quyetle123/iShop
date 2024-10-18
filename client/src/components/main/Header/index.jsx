import { Link } from "react-router-dom";
import {
  AccountButton,
  AccountContainer,
  DropdownItem,
  DropdownMenu,
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  NavLink,
  NavList,
} from "./style";
import { getToken, removeToken } from "../../../utils/token";

const Header = () => {
  const token = getToken();
  const handleLogOut = () => {
    removeToken();
    window.location.reload();
  };
  return (
    <HeaderContainer>
      <Logo
        src="https://pos.nvncdn.com/4e732c-26/art/artCT/20161123_21IwG4VaWJ8BScUhd2coxILg.png"
        alt="Logo"
      />
      <Nav>
        <NavList>
          <NavItem>
            <NavLink>
              <Link to="/">Trang chủ</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link>Danh sách sản phẩm</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link>Bài viết</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link>Liên hệ</Link>
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
      <AccountContainer>
        <AccountButton>{token ? token.username : "Tài khoản"}</AccountButton>
        <DropdownMenu>
          <DropdownItem style={{ display: token ? "none" : "block" }}>
            <Link to="/login">Đăng nhập</Link>
          </DropdownItem>
          <DropdownItem style={{ display: token ? "none" : "block" }}>
            <Link to="/register">Đăng kí</Link>
          </DropdownItem>
          <DropdownItem style={{ display: token ? "block" : "none" }}>
            <Link to="/cart">Giỏ hàng</Link>
          </DropdownItem>
          <DropdownItem style={{ display: token ? "block" : "none" }}>
            <Link to="/myOrder">Đơn hàng</Link>
          </DropdownItem>
          <DropdownItem
            onClick={handleLogOut}
            style={{ display: token ? "block" : "none" }}
          >
            <Link to="/">Đăng xuất</Link>
          </DropdownItem>
        </DropdownMenu>
      </AccountContainer>
    </HeaderContainer>
  );
};

export default Header;
