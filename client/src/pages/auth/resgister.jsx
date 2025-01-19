import { v4 as uuidv4 } from "uuid";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../../reudux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { username, password, email, city, address, agree } = values;

    if (!agree) {
      message.warning("Vui lòng chấp nhận điều khoản để đăng kí.");
      return;
    }

    const id = uuidv4();
    dispatch(registerStart({ id, username, password, email, role: "user", city, address }));
    message.success("Đăng ký thành công!");
    navigate("/login");
  };

  const onFinishFailed = () => {
    message.error("Vui lòng điền đầy đủ thông tin!");
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
          maxWidth: "500px",
          width: "100%",
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: "#2a2a47" }}>
          Đăng ký tài khoản
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu nhập lại không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Thành phố"
            name="city"
            rules={[{ required: true, message: "Vui lòng nhập thành phố!" }]}
          >
            <Input placeholder="Thành phố" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject("Vui lòng chấp nhận điều khoản!"),
              },
            ]}
          >
            <Checkbox>
              Tôi chấp nhận điều khoản <a href="#">Đọc điều khoản</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              style={{ backgroundColor: "#2a2a47", borderColor: "#2a2a47" }}
            >
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </Form.Item>
        </Form>
        {error && (
          <Text type="danger" style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
            {error}
          </Text>
        )}
        <Text style={{ display: "block", textAlign: "center", marginTop: "20px" }}>
          Đã có tài khoản?{" "}
          <a href="/login" style={{ color: "#2a2a47" }}>
            Đăng nhập ngay
          </a>
        </Text>
      </div>
    </div>
  );
};

export default Register;
