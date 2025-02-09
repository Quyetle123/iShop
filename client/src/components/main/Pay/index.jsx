import { useState } from "react";
import { Card, Input, Select, Button, Form, Table, Space, message } from "antd";
import { PlusOutlined, WalletOutlined, BankOutlined } from "@ant-design/icons";

const { Option } = Select;

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(30000);

  const addresses = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      address: "Hà Nội, Ba Đình, Kim Mã",
    },
    {
      id: 2,
      name: "Trần Thị B",
      phone: "0987654321",
      address: "Hồ Chí Minh, Quận 1, Lê Lợi",
    },
  ];

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
      <Card title="Thông tin người nhận" className="mb-4">
        <Form form={form} layout="vertical">
          <Form.Item name="address" label="Chọn địa chỉ">
            <Select>
              {addresses.map((addr) => (
                <Option
                  key={addr.id}
                  value={addr.id}
                >{`${addr.name} - ${addr.phone} - ${addr.address}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="dashed" icon={<PlusOutlined />}>
            Thêm địa chỉ mới
          </Button>
        </Form>
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
              render: (src) => <img src={src} alt="product" className="w-10" />,
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
