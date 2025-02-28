import { v4 as uuidv4 } from "uuid";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addAdditionalAddressStart } from "../../redux/slices/additionalAddressSlice";
import { fetchProvincesStart } from "../../redux/slices/provinceSlice";
import { fetchDistrictByProvinceIdStart } from "../../redux/slices/districtSlice";
import { fetchWardsByDistrictIdStart } from "../../redux/slices/wardSlice";

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.provinces);
  const { districts } = useSelector((state) => state.districts);
  const { wards } = useSelector((state) => state.wards);

  const provinceList = Array.isArray(provinces.province)
    ? provinces.province
    : [];
  const districtList = Array.isArray(districts.district)
    ? districts.district
    : [];
  const wardList = Array.isArray(wards.wards) ? wards.wards : [];

  useEffect(() => {
    dispatch(fetchProvincesStart());
  }, [dispatch]);

  const handleProvinceChange = (provinceCode) => {
    dispatch(fetchDistrictByProvinceIdStart(provinceCode));
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = (districtCode) => {
    dispatch(fetchWardsByDistrictIdStart(districtCode));
    form.setFieldsValue({ ward: undefined });
  };

  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const {
      username,
      phoneNumber,
      password,
      email,
      city,
      district,
      ward,
      address,
      agree,
    } = values;

    if (!agree) {
      message.warning("Vui lòng chấp nhận điều khoản để đăng kí.");
      return;
    }

    const id = uuidv4();
    dispatch(
      registerStart({
        id,
        username,
        phoneNumber,
        password,
        email,
        role: "user",
      })
    );

    dispatch(
      addAdditionalAddressStart({
        accountid: id,
        province_id:city,
        district_id: district,
        wards_id: ward,
        address,
        is_default: true,
      })
    );
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
            label="Họ và tên"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Số điện thoại" />
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
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp!")
                  );
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
            rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
          >
            <Select
              placeholder="Chọn thành phố"
              onChange={handleProvinceChange}
            >
              {provinceList?.map((province) => (
                <Option key={province.province_id} value={province.province_id}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
          >
            <Select
              placeholder="Chọn quận/huyện"
              onChange={handleDistrictChange}
            >
              {districtList?.map((district) => (
                <Option key={district.district_id} value={district.district_id}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Phường/Xã"
            name="ward"
            rules={[{ required: true, message: "Vui lòng chọn phường/xã!" }]}
          >
            <Select placeholder="Chọn phường/xã">
              {wardList?.map((ward) => (
                <Option key={ward.wards_id} value={ward.wards_id}>
                  {ward.name}
                </Option>
              ))}
            </Select>
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
                  value
                    ? Promise.resolve()
                    : Promise.reject("Vui lòng chấp nhận điều khoản!"),
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
          <Text
            type="danger"
            style={{ display: "block", textAlign: "center", marginTop: "10px" }}
          >
            {error}
          </Text>
        )}
        <Text
          style={{ display: "block", textAlign: "center", marginTop: "20px" }}
        >
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
