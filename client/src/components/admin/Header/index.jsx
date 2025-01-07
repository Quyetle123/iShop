import { HeaderContainer, HeaderTop, LogoImg } from "./style";
import {
  AppleOutlined,
  AppstoreOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    key: "sub1",
    label: <Link to='/admin'>Trang chủ</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "sub2",
    label: "Quản lý danh mục",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5", label: <Link to='/admin/addCategory'>Thêm danh mục</Link> },
      { key: "6", label: <Link to='/admin/allCategories'>Tất cả danh mục</Link> },
    ],
  },
  {
    key: "sub3",
    label: "Quản lý sản phẩm",
    icon: <AppleOutlined />,
    children: [
      { key: "7", label: <Link to='/admin/colorManager'>Màu sắc sản phẩm</Link> },
      { key: "8", label: <Link to='/admin/addProduct'>Thêm sản phẩm</Link> },
      { key: "9", label: <Link to='/admin/allProduct'>Tất cả sản phẩm</Link> },
    ],
  },
  {
    key: "sub4",
    label: <Link to='/admin/allOrder'>Tất cả đơn hàng</Link>,
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "sub5",
    label: "Chi nhánh - cửa hàng",
    icon: <ShopOutlined />,
    children: [
      { key: "10", label: <Link to='/admin/branch-store'>Quản lí chi nhánh, cửa hàng</Link> },
      { key: "11", label: <Link to='/admin/addStore'>Thêm cửa hàng</Link> },
    ],
  },
  {
    key: "sub6",
    label: "Bài viết",
    icon: <FileTextOutlined />,
    children: [
      {key: "12", label: <Link to='/admin/add-post'>Thêm bài viết</Link>},
      {key: "13", label: <Link to="/admin/all-posts">Tất cả bài viết</Link>}
    ]
  },
  {
    key: "sub7",
    label: "Mã giảm giá",
    icon: <FileTextOutlined />,
    children: [
      {key: "14", label: <Link to='/admin/add-vourcher'>Thêm mã giảm giá</Link>},
      {key: "15", label: <Link to="/admin/all-vourchers">Tất cả mã giảm giá</Link>}
    ]
  }
];

const Header = () => {
  const [current, setCurrent] = useState("1");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <HeaderContainer>
      <HeaderTop>
        <LogoImg
          src="https://pos.nvncdn.com/4e732c-26/art/artCT/20161123_21IwG4VaWJ8BScUhd2coxILg.png"
          alt="Icon TopZone"
        />
      </HeaderTop>
      <Menu
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
        style={{
          backgroundColor: "#fff",
          color: "#fff",
          borderRight: "none",
        }}
      />
    </HeaderContainer>
  );
};

export default Header;
