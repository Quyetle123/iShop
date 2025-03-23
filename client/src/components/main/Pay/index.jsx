import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Form,
  Table,
  Space,
  Radio,
  Modal,
  Select,
  Checkbox,
  Empty,
} from "antd";
import {
  PlusOutlined,
  WalletOutlined,
  BankOutlined,
  DollarCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdditionalAddressStart,
  fetchAdditionalAddressByIdStart,
  fetchAdditionalAddressesStart,
} from "../../../redux/slices/additionalAddressSlice";
import { getToken } from "../../../utils/token";
import {
  getOrderDraftStart,
  newOrderStart,
} from "../../../redux/slices/orderSlice";
import { fetchProvincesStart } from "../../../redux/slices/provinceSlice";
import { fetchDistrictByProvinceIdStart } from "../../../redux/slices/districtSlice";
import { fetchWardsByDistrictIdStart } from "../../../redux/slices/wardSlice";
import {
  addMainAddressStart,
  fetchMainAddressStart,
  updateMainAddressStart,
} from "../../../redux/slices/addressSlice";
import { addPaymentStart } from "../../../redux/slices/paymentSlice";

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("momo");

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

  const { mainAddress } = useSelector((state) => state.addresses);

  useEffect(() => {
    dispatch(fetchMainAddressStart(getToken().id));
  }, [dispatch]);

  const { additionalAddresses } = useSelector(
    (state) => state.additionalAddresses
  );
  const additionalAddressList = Array.isArray(additionalAddresses.addresses)
    ? additionalAddresses.addresses
    : [];
  useEffect(() => {
    dispatch(fetchAdditionalAddressesStart(getToken().id));
  }, [dispatch]);

  const [selectedAddress, setSelectedAddress] = useState(
    mainAddress?.address?.id
  );
  useEffect(() => {
    if (mainAddress?.mainAddress) {
      setSelectedAddress(mainAddress.mainAddress.id);
      form.setFieldsValue({ address: mainAddress.mainAddress.id });
    }
  }, [mainAddress, form]);

  const { selectAddress } = useSelector((state) => state.additionalAddresses);

  useEffect(() => {
    dispatch(fetchAdditionalAddressByIdStart(selectedAddress));
  }, [dispatch, selectedAddress]);

  const { orderDraft } = useSelector((state) => state.orders.orderDraft);

  const orderDetails = orderDraft?.OrderDetails ? orderDraft.OrderDetails : [];

  useEffect(() => {
    dispatch(getOrderDraftStart(getToken().id));
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [newSelectedAddress, setNewSelectedAddress] = useState(null);

  const handleAddressChange = (value) => {
    setNewSelectedAddress(value);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAddressChange = () => {
    setSelectedAddress(newSelectedAddress);
    dispatch(
      updateMainAddressStart({
        id: newSelectedAddress,
        oldMainAddress: mainAddress?.mainAddress.id,
      })
    );
    setIsConfirmModalOpen(false);
  };

  const handleCancelAddressChange = () => {
    setIsConfirmModalOpen(false);
  };

  const handleAddAddress = (values) => {
    if (values.defaultAddress) {
      dispatch(
        addMainAddressStart({
          province_id: values.province,
          district_id: values.district,
          wards_id: values.ward,
          address: values.address,
          accountid: getToken().id,
          oldMainAddress: mainAddress?.mainAddress.id,
        })
      );
    } else {
      dispatch(
        addAdditionalAddressStart({
          province_id: values.province,
          district_id: values.district,
          wards_id: values.ward,
          address: values.address,
          accountid: getToken().id,
        })
      );
    }
    setIsModalOpen(false);
  };

  const handlePay = () => {
    if (paymentMethod === "vnpay") {
      dispatch(
        addPaymentStart({ orderId: orderDraft?.id, amount: orderDraft?.total })
      );
      console.log("vnpay");
    } else if (paymentMethod === "momo") {
      console.log("momo");
    } else {
      dispatch(
        newOrderStart({
          id: orderDraft?.id,
          address: selectAddress?.address.address,
          ward: selectAddress?.address.Ward.wards_id,
          district: selectAddress?.address.Ward.District.district_id,
          city: selectAddress?.address.Ward.District.Province.province_id,
          payMethod: paymentMethod,
          usename: getToken().username,
          phoneNumber: getToken().phoneNumber,
          status: "Chờ phê duyệt",
        })
      );
    }
  };

  return orderDraft ? (
    <div style={{ backgroundColor: "#fff", padding: "40px 150px" }}>
      <Card title="Địa chỉ người nhận" className="mb-4">
        <Form form={form} layout="vertical">
          <Form.Item name="address">
            <Radio.Group
              className="grid grid-cols-4 gap-2"
              onChange={(e) => handleAddressChange(e.target.value)}
              value={selectedAddress}
            >
              <Card
                key={mainAddress?.mainAddress?.id}
                className={`mb-2 ${
                  selectedAddress === mainAddress?.mainAddress?.id
                    ? "border-primary"
                    : ""
                }`}
                onClick={() => setSelectedAddress(mainAddress?.mainAddress?.id)}
                style={{
                  cursor: "pointer",
                  border:
                    selectedAddress === mainAddress?.mainAddress?.id
                      ? "2px solid #1890ff"
                      : "1px solid #d9d9d9",
                }}
              >
                <Radio
                  value={mainAddress?.mainAddress?.id}
                  style={{ display: "block" }}
                >
                  {mainAddress?.mainAddress.address} -{" "}
                  {mainAddress?.mainAddress.Ward.name} -{" "}
                  {mainAddress?.mainAddress.Ward.District.name}
                  <br />
                  {mainAddress?.mainAddress.Ward.District.Province.name}
                </Radio>
              </Card>
              {additionalAddressList.map((addr) => (
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
                    {addr.address} - {addr?.Ward.name} -{" "}
                    {addr?.Ward?.District.name}
                    <br />
                    {addr?.Ward?.District?.Province.name}
                  </Radio>
                </Card>
              ))}
            </Radio.Group>
            <Modal
              title="Xác nhận địa chỉ mặc định"
              open={isConfirmModalOpen}
              onOk={handleConfirmAddressChange}
              onCancel={handleCancelAddressChange}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <p>Bạn có muốn đặt địa chỉ này làm địa chỉ mặc định không?</p>
            </Modal>
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
              rules={[{ required: true, message: "Vui lòng chọn thành phố" }]}
            >
              <Select
                placeholder="Chọn thành phố"
                onChange={handleProvinceChange}
              >
                {provinceList.map((province) => (
                  <Select.Option
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Quận huyện"
              name="district"
              rules={[{ required: true, message: "Vui lòng chọn quận huyện" }]}
            >
              <Select
                placeholder="Chọn quận huyện"
                onChange={handleDistrictChange}
              >
                {districtList.map((district) => (
                  <Select.Option
                    key={district.district_id}
                    value={district.district_id}
                  >
                    {district.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Phường xã"
              name="ward"
              rules={[{ required: true, message: "Vui lòng chọn phường xã" }]}
            >
              <Select placeholder="Chọn phường xã">
                {wardList.map((ward) => (
                  <Select.Option key={ward.wards_id} value={ward.wards_id}>
                    {ward.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="defaultAddress" valuePropName="checked">
              <Checkbox>Chọn làm địa chỉ mặc định</Checkbox>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu địa chỉ
            </Button>
          </Form>
        </Modal>
      </Card>

      <Card title="Sản phẩm trong đơn hàng" className="mb-4">
        <Table
          dataSource={orderDetails}
          pagination={false}
          columns={[
            {
              title: "Sản phẩm",
              dataIndex: "ProductColor",
              render: (ProductColor) => ProductColor?.Product?.productname,
            },
            {
              title: "Ảnh",
              dataIndex: "ProductColor",
              render: (ProductColor) => (
                <img
                  src={ProductColor?.ProductImages?.[0]?.image}
                  alt="product"
                  style={{ width: "50px" }}
                />
              ),
            },

            {
              title: "Giá",
              dataIndex: "price",
              render: (price) => `${price.toLocaleString()} đ`,
            },
            {
              title: "Số lượng",
              dataIndex: "quantity",
              render: (quantity) => `${quantity}`,
            },
          ]}
        />
      </Card>

      <div className="flex gap-4">
        <Card title="Thông tin người nhận" className="mb-4 flex-1">
          <p className="mb-3">
            <strong>Họ và tên:</strong> {getToken().username}
          </p>
          <p className="mb-3">
            <strong>Số điện thoại:</strong> {getToken().phoneNumber}
          </p>
          <p className="mb-3">
            <strong>Địa chỉ:</strong> {selectAddress?.address.address} -{" "}
            {selectAddress?.address.Ward.name} -{" "}
            {selectAddress?.address.Ward.District.name} -{" "}
            {selectAddress?.address.Ward.District.Province.name}
          </p>
        </Card>

        <Card title="Phương thức thanh toán" className="mb-4 flex-1">
          <Space direction="vertical" className="w-full">
            <Button
              type="primary"
              icon={<WalletOutlined />}
              className="bg-pink-500 hover:bg-pink-600 w-full"
              onClick={() => setPaymentMethod("momo")}
            >
              Momo
            </Button>
            <Button
              type="primary"
              icon={<BankOutlined />}
              className="bg-blue-500 hover:bg-blue-600 w-full"
              onClick={() => setPaymentMethod("vnpay")}
            >
              VNPay
            </Button>
            <Button
              type="primary"
              icon={<DollarCircleOutlined />}
              className="bg-green-500 hover:bg-green-600 w-full"
              onClick={() => setPaymentMethod("Thanh toán khi nhận hàng")}
            >
              Thanh toán khi nhận hàng
            </Button>
          </Space>
        </Card>
      </div>

      <Card title="Tóm tắt đơn hàng">
        <p>
          Tạm tính: <b>{orderDraft?.total.toLocaleString()} đ</b>
        </p>
        <p>
          Phí ship: <b>0 đ</b>
        </p>
        <p>
          Giảm giá: <b>0 đ</b>
        </p>
        <p>
          <b>Tổng cộng: {orderDraft?.total.toLocaleString()} đ</b>
        </p>
        <Button
          className="mt-2"
          type="primary"
          block
          onClick={handlePay}
          style={{ backgroundColor: "#ff6f00" }}
        >
          Đặt hàng
        </Button>
      </Card>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          textAlign: "center",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Empty
          description={<span>Không có đơn hàng nào cần thanh toán</span>}
        />
        <Button
          type="primary"
          icon={<HomeOutlined />}
          style={{ marginTop: "20px" }}
          onClick={() => (window.location.href = "/")}
        >
          Quay lại trang chủ
        </Button>
      </Card>
    </div>
  );
};

export default CheckoutPage;
