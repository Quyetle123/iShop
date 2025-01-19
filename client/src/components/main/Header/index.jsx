/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { Menu, Dropdown, Avatar, Badge, Button, List, Popover } from "antd";
import { IoIosNotifications } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getToken, removeToken } from "../../../utils/token";
import {
  deleteNotifyStart,
  fetchNotifyStart,
} from "../../../reudux/slices/notifySlice";

const socket = io("http://localhost:5000");

const Header = () => {
  const dispatch = useDispatch();
  const [notifyList, setNotifyList] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const token = getToken();

  const handleLogOut = () => {
    removeToken();
    window.location.reload();
  };

  useEffect(() => {
    if (!token) return;
    socket.on("connect", () => console.log("Socket connected: ", socket.id));
    socket.on("newMessage", (notify) => {
      if (notify.accountid === token.id) {
        setNotifyList((prev) => [...prev, notify]);
        setHasNewNotifications(true);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("connect");
    };
  }, [token]);

  const { notifies } = useSelector((state) => state.notifies) || { notify: [] };
  const arrList = Array.isArray(notifies.notify) ? notifies.notify : [];

  useEffect(() => {
    if (arrList.length > 0) {
      setNotifyList(arrList);
    }
  }, [arrList]);

  useEffect(() => {
    if (token) {
      dispatch(fetchNotifyStart(token.id));
    }
  }, [dispatch]);

  const deleteNotify = (id) => {
    dispatch(deleteNotifyStart(id));
  };

  const notifyContent = (
    <div style={{ maxWidth: 300, maxHeight: 400, overflowY: "auto" }}>
      <List
        dataSource={notifyList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <TiDeleteOutline
                key="delete"
                onClick={() => deleteNotify(item.id)}
                className="text-[20px] cursor-pointer"
                style={{ color: "#ff4d4f" }}
              />,
            ]}
          >
            {item.message}
          </List.Item>
        )}
        locale={{ emptyText: "Chưa có thông báo nào." }}
      />
    </div>
  );

  const accountMenu = (
    <Menu
      items={
        token
          ? [
              {
                label: <Link to="/cart">Giỏ hàng</Link>,
                key: "cart",
              },
              {
                label: <Link to="/myOrder">Đơn hàng</Link>,
                key: "myOrder",
              },
              {
                label: (
                  <span onClick={handleLogOut} style={{ cursor: "pointer" }}>
                    Đăng xuất
                  </span>
                ),
                key: "logout",
              },
            ]
          : [
              {
                label: <Link to="/login">Đăng nhập</Link>,
                key: "login",
              },
              {
                label: <Link to="/register">Đăng kí</Link>,
                key: "register",
              },
            ]
      }
    />
  );

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 100px",
        backgroundColor: "#1d1d1d",
        borderBottom: "2px solid #282828",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link to="/">
        <img
          src="https://pos.nvncdn.com/4e732c-26/art/artCT/20161123_21IwG4VaWJ8BScUhd2coxILg.png"
          alt="Logo"
          style={{ height: "50px" }}
        />
      </Link>

      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          flex: 1,
          justifyContent: "center",
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <Menu.Item key="home">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="products">
          <Link to="/">Danh sách sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="posts">
          <Link to="/">Bài viết</Link>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link to="/">Liên hệ</Link>
        </Menu.Item>
      </Menu>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Popover
          content={notifyContent}
          trigger="click"
          overlayInnerStyle={{ padding: 0 }}
        >
          <Badge
            count={hasNewNotifications ? notifyList.length : 0}
            offset={[10, 0]}
            size="small"
            style={{ backgroundColor: "#ff4d4f" }}
          >
            <Button
              shape="circle"
              icon={<IoIosNotifications size={20} />}
              style={{
                backgroundColor: "#1d1d1d",
                color: "#fff",
                border: "1px solid #444",
              }}
            />
          </Badge>
        </Popover>
        <Dropdown overlay={accountMenu} placement="bottomRight">
          <Avatar
            style={{
              backgroundColor: "#1677ff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {token ? token.username[0].toUpperCase() : "A"}
          </Avatar>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
