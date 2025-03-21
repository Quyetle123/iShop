import { Layout, Menu } from "antd";
import {
  BankOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../../context/SidebarContext";

const { Sider } = Layout;

const items = [
  {
    key: "sub1",
    label: <Link to="/admin">Trang chủ</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "sub2",
    label: <Link to="/admin/allOrder">Tất cả đơn hàng</Link>,
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "sub3",
    label: <Link to="/admin/storeStock">Kho hàng</Link>,
    icon: <BankOutlined />,
  },
  {
    key: "sub4",
    label: <Link to="/admin/stockHistory">Lịch sử kho hàng</Link>,
    icon: <BankOutlined />,
  },
];

const Header = () => {
  const { collapsed, setCollapsed } = useContext(SidebarContext);
  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
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
            style={{ maxWidth: "40%", marginLeft: "16px" }}
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
