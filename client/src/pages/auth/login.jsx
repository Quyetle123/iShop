import { Link, useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Form, Input, Button, Checkbox, Typography, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginWithGoogleStart } from "../../redux/slices/authSlice";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { socket } from "../../utils/socket";

const { Title, Text } = Typography;


function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { account } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(loginStart({ phoneNumber, password }));
  };

  useEffect(() => {
    if(account) {
      socket.emit("login", {accountId: account?.id});
      if (account?.role === "user") {
        navigate("/");
      } else if (account?.role === "admin") {
        navigate("/admin");
      } else if (account?.role === "administrator") {
        navigate("/administrator");
      }
    }
  }, [navigate, account]);

  const auth = getAuth();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      dispatch(loginWithGoogleStart({ email }));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e1e2f, #2a2a47)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: "#2a2a47" }}>
          Đăng nhập
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input
              placeholder="Số điện thoại"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Checkbox>Lưu tài khoản</Checkbox>
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </Space>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#2a2a47",
                borderColor: "#2a2a47",
                height: "40px",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center" }}
          >
            ------------------ Lựa chọn khác ------------------
          </Text>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Button
              icon={<FacebookOutlined />}
              style={{
                backgroundColor: "#3b5998",
                color: "#fff",
                width: "100%",
              }}
              block
            >
              Đăng nhập bằng Facebook
            </Button>
            <Button
              onClick={handleLoginWithGoogle}
              icon={<GoogleOutlined />}
              style={{
                backgroundColor: "#db4437",
                color: "#fff",
                width: "100%",
              }}
              block
            >
              Đăng nhập bằng Google
            </Button>
          </Space>
          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center" }}
          >
            Chưa có tài khoản?{" "}
            <Link to="/register" style={{ color: "#2a2a47" }}>
              Đăng kí ngay
            </Link>
          </Text>
        </Form>
      </div>
    </div>
  );
}

export default Login;
