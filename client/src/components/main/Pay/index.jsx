import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Form,
  Table,
  Space,
  message,
  Radio,
  Modal,
  Select,
} from "antd";
import { PlusOutlined, WalletOutlined, BankOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDistrictsStart,
  fetchProvincesStart,
  fetchWardsStart,
} from "../../../redux/slices/addressSlice";
import {
  addAdditionalAddressStart,
  fetchAdditionalAddressesStart,
} from "../../../redux/slices/additionalAddressSlice";
import { getToken } from "../../../utils/token";
import { findNameAddress } from "../../../utils/findAddress";

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(30000);
  const [selectedAddress, setSelectedAddress] = useState(1);

  console.log(selectedAddress);

  const dispatch = useDispatch();
  const { provinces, districts, wards } = useSelector(
    (state) => state.addresses
  );
  const provinceList = Array.isArray(provinces) ? provinces : [];
  const districtList = Array.isArray(districts.districts)
    ? districts.districts
    : [];
  const wardList = Array.isArray(wards.wards) ? wards.wards : [];

  useEffect(() => {
    dispatch(fetchProvincesStart());
  }, [dispatch]);

  const handleProvinceChange = (provinceCode) => {
    dispatch(fetchDistrictsStart(provinceCode));
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = (districtCode) => {
    dispatch(fetchWardsStart(districtCode));
    form.setFieldsValue({ ward: undefined });
  };

  const { additionalAddresses } = useSelector(
    (state) => state.additionalAddresses
  );
  const additionalAddressList = Array.isArray(additionalAddresses)
    ? additionalAddresses
    : [];
  console.log(additionalAddressList);

  useEffect(() => {
    dispatch(fetchAdditionalAddressesStart(getToken().id));
  }, [dispatch]);

  const products = [
    {
      key: 1,
      image: "https://via.placeholder.com/50",
      name: "Sản phẩm 1",
      price: 200000,
      quantity: 2,
    },
    {
      key: 2,
      image: "https://via.placeholder.com/50",
      name: "Sản phẩm 2",
      price: 150000,
      quantity: 1,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAddress = (values) => {
    const provinceName = findNameAddress(provinceList, values.province);
    dispatch(fetchDistrictsStart(values.province));
    const districtName = findNameAddress(districtList, values.district);
    dispatch(fetchWardsStart(values.district));
    const wardName = findNameAddress(wardList, values.ward);
    dispatch(
      addAdditionalAddressStart({
        city: provinceName.name,
        district: districtName.name,
        ward: wardName.name,
        address: values.address,
        accountid: getToken().id,
      })
    );
  };

  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingFee - discount;

  const handleApplyVoucher = () => {
    if (voucher === "GIAM10") {
      setDiscount(50000);
      message.success("Áp dụng voucher thành công!");
    } else {
      setDiscount(0);
      message.error("Voucher không hợp lệ!");
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "40px 150px" }}>
      <Card title="Địa chỉ người nhận" className="mb-4">
        <Form form={form} layout="vertical">
          <Form.Item name="address">
            <Radio.Group
              className="grid grid-cols-4 gap-2"
              onChange={(e) => setSelectedAddress(e.target.value)}
              value={selectedAddress}
            >
              {additionalAddressList[0]?.addresses?.map((addr) => (
                <Card
                  key={addr.id}
                  className={`mb-2 ${
                    selectedAddress === addr.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedAddress(addr.id)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedAddress === addr.id
                        ? "2px solid #1890ff"
                        : "1px solid #d9d9d9",
                  }}
                >
                  <Radio value={addr.id} style={{ display: "block" }}>
                    {addr.address} - {addr.ward} - {addr.district} 
                    <br />
                    {addr.city}
                  </Radio>
                </Card>
              ))}
            </Radio.Group>
          </Form.Item>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Địa chỉ khác
          </Button>
        </Form>
        <Modal
          title="Thêm địa chỉ mới"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form layout="vertical" form={form} onFinish={handleAddAddress}>
            <Form.Item
              label="Thành phố"
              name="province"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thành phố",
                },
              ]}
            >
              <Select
                placeholder="Chọn thành phố"
                onChange={handleProvinceChange}
              >
                {provinceList.map((province) => (
                  <Select.Option key={province.code} value={province.code}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Quận huyện"
              name="district"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn quận huyện",
                },
              ]}
            >
              <Select
                placeholder="Chọn quận huyện"
                onChange={handleDistrictChange}
              >
                {districtList.map((district) => (
                  <Select.Option key={district.code} value={district.code}>
                    {district.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Phường xã"
              name="ward"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phường xã",
                },
              ]}
            >
              <Select placeholder="Chọn phường xã">
                {wardList.map((ward) => (
                  <Select.Option key={ward.code} value={ward.code}>
                    {ward.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu địa chỉ
            </Button>
          </Form>
        </Modal>
      </Card>

      <Card title="Sản phẩm trong đơn hàng" className="mb-4">
        <Table
          dataSource={products}
          pagination={false}
          columns={[
            { title: "Sản phẩm", dataIndex: "name" },
            {
              title: "Ảnh",
              dataIndex: "image",
              render: (src) =>
                src ? (
                  <img src={src} alt="product" style={{ width: "50px" }} />
                ) : (
                  "Không có ảnh"
                ),
            },
            {
              title: "Giá",
              dataIndex: "price",
              render: (price) => `${price.toLocaleString()} đ`,
            },
          ]}
        />
      </Card>

      <Card title="Phương thức thanh toán" className="mb-4">
        <Space>
          <Button
            type={paymentMethod === "momo" ? "primary" : "default"}
            icon={<WalletOutlined />}
            onClick={() => setPaymentMethod("momo")}
          >
            Momo
          </Button>
          <Button
            type={paymentMethod === "vnpay" ? "primary" : "default"}
            icon={<BankOutlined />}
            onClick={() => setPaymentMethod("vnpay")}
          >
            VNPay
          </Button>
        </Space>
      </Card>

      <Card title="Mã giảm giá" className="mb-4">
        <Space>
          <Input
            placeholder="Nhập mã giảm giá"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          <Button onClick={handleApplyVoucher}>Áp dụng</Button>
        </Space>
      </Card>

      <Card title="Tóm tắt đơn hàng">
        <p>
          Tạm tính: <b>{subtotal.toLocaleString()} đ</b>
        </p>
        <p>
          Phí ship: <b>{shippingFee.toLocaleString()} đ</b>
        </p>
        <p>
          Giảm giá: <b>-{discount.toLocaleString()} đ</b>
        </p>
        <p>
          <b>Tổng cộng: {total.toLocaleString()} đ</b>
        </p>
        <Button type="primary" block style={{ backgroundColor: "#ff6f00" }}>
          Đặt hàng
        </Button>
      </Card>
    </div>
  );
};

export default CheckoutPage;
