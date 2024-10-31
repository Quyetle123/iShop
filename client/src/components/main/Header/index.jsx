/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import {
  AccountButton,
  AccountContainer,
  CloseNotify,
  DropdownItem,
  DropdownMenu,
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  NavLink,
  NavList,
  NotifyButton,
  NotifyDot,
  NotifyMenu,
  NotNotify,
} from "./style";
import { getToken, removeToken } from "../../../utils/token";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotifyStart,
  fetchNotifyStart,
} from "../../../reudux/slices/notifySlice";
import { TiDeleteOutline } from "react-icons/ti";

const socket = io("http://localhost:5000");

const Header = () => {
  const dispatch = useDispatch();
  const [notifyList, setNotifyList] = useState();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const token = getToken();

  const handleLogOut = () => {
    removeToken();
    window.location.reload();
  };

  useEffect(() => {
    if(!token) return;
    socket.on("connect", () => {
      console.log("Socket connected: ", socket.id);
    });

    socket.on("newMessage", (notify) => {
      if (notify.accountid === token.id) {
        setNotifyList((notifies) => [...notifies, notify]);
        setHasNewNotifications(true);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("connect");
    };
  }, [token]);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    if (hasNewNotifications) {
      setHasNewNotifications(false);
    }
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);
  };

  const { notifies } = useSelector((state) => state.notifies);
  const arrList = Array.isArray(notifies.notify) ? notifies.notify : [];
  useEffect(() => {
    setNotifyList(arrList);
  }, [arrList]);

  useEffect(() => {
    if(token) {
      dispatch(fetchNotifyStart(token.id));
    }
  }, [dispatch]);

  const deleteNotify = (id) => {
    dispatch(deleteNotifyStart(id));
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
        <div style={{ marginRight: "30px", position: "relative" }}>
          <NotifyButton onClick={toggleNotifications}>
            <IoIosNotifications
              style={{ fontSize: "25px", marginTop: "5px" }}
            />
            {hasNewNotifications && <NotifyDot />}
          </NotifyButton>
          {showNotifications && (
            <NotifyMenu style={{ right: "-10px", top: "30px" }}>
              {notifyList && notifyList.length > 0 ? (
                notifyList.map((notify) => (
                  <DropdownItem key={notify.id}>
                    <p style={{ width: "90%" }}>{notify.message}</p>
                    <CloseNotify>
                      <TiDeleteOutline
                        onClick={() => deleteNotify(notify.id)}
                        className="text-[20px] cursor-pointer"
                      />
                    </CloseNotify>
                  </DropdownItem>
                ))
              ) : (
                <NotNotify>
                  <p>Chưa có thông báo</p>
                </NotNotify>
              )} 
            </NotifyMenu>
          )}
        </div>
        <div onMouseEnter={toggleAccountMenu} onMouseLeave={toggleAccountMenu}>
          <AccountButton>{token ? token.username : "Tài khoản"}</AccountButton>
          {showAccountMenu && (
            <DropdownMenu style={{ top: "26px" }}>
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
          )}
        </div>
      </AccountContainer>
    </HeaderContainer>
  );
};

export default Header;
