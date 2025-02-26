import {
    Layout,
    Menu,
  } from "antd";
  import {
    AppleOutlined,
    AppstoreOutlined,
    HomeOutlined,
    ShopOutlined,
    FileTextOutlined,
  } from "@ant-design/icons";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  const { Sider } = Layout;
  
  const items = [
    {
      key: "sub1",
      label: <Link to="/administrator">Trang chủ</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "sub2",
      label: "Quản lý danh mục",
      icon: <AppstoreOutlined />,
      children: [
        { key: "5", label: <Link to="/administrator/addCategory">Thêm danh mục</Link> },
        { key: "6", label: <Link to="/administrator/allCategories">Tất cả danh mục</Link> },
      ],
    },
    {
      key: "sub3",
      label: "Quản lý sản phẩm",
      icon: <AppleOutlined />,
      children: [
        { key: "7", label: <Link to="/administrator/colorManager">Màu sắc sản phẩm</Link> },
        { key: "8", label: <Link to="/administrator/addProduct">Thêm sản phẩm</Link> },
        { key: "9", label: <Link to="/administrator/allProduct">Tất cả sản phẩm</Link> },
      ],
    },
    {
      key: "sub4",
      label: "Chi nhánh - cửa hàng",
      icon: <ShopOutlined />,
      children: [
        { key: "10", label: <Link to="/administrator/branch-store">Quản lí chi nhánh, cửa hàng</Link> },
        { key: "11", label: <Link to="/administrator/addStore">Thêm cửa hàng</Link> },
      ],
    },
    {
      key: "sub5",
      label: "Bài viết",
      icon: <FileTextOutlined />,
      children: [
        { key: "12", label: <Link to="/administrator/add-post">Thêm bài viết</Link> },
        { key: "13", label: <Link to="/administrator/all-posts">Tất cả bài viết</Link> },
      ],
    },
    {
      key: "sub7",
      label: "Mã giảm giá",
      icon: <FileTextOutlined />,
      children: [
        { key: "14", label: <Link to="/administrator/add-vourcher">Thêm mã giảm giá</Link> },
        { key: "15", label: <Link to="/administrator/all-vourchers">Tất cả mã giảm giá</Link> },
      ],
    },
  ];
  
  const Header = () => {
    const [current, setCurrent] = useState("1");
  
    const onClick = (e) => {
      setCurrent(e.key);
    };
  
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          theme="dark"
          collapsible
          width={250}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            backgroundColor: "#001529",
          }}
        >
          <div
            style={{
              height: "64px",
              margin: "16px",
              textAlign: "center",
            }}
          >
            <img
              src="https://pos.nvncdn.com/f2169f-49462/store/20190520_Lmq0Fv79qw3Rvt8AtIDgUOFZ.png"
              alt="Logo"
              style={{ maxHeight: "80%", maxWidth: "50%" }}
            />
          </div>
          <Menu
            onClick={onClick}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[current]}
            mode="inline"
            items={items}
            theme="dark"
            style={{ fontWeight: "500" }}
          />
        </Sider>
      </Layout>
    );
  };
  
  export default Header;
  