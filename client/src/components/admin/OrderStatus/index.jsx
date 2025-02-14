import { useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Steps, Modal, Card, Typography, Row, Col, Divider, Button } from "antd";
import { PhoneOutlined, HomeOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const orderData = [
  {
    id: "1",
    customer: "Nguyễn Văn A",
    phone: "0987654321",
    address: "123 Đường ABC, TP.HCM",
    status: 1,
    total: "500.000đ",
    items: [
      { name: "Sản phẩm 1", price: "200.000đ", image: "https://via.placeholder.com/50", quantity: 1 },
      { name: "Sản phẩm 2", price: "300.000đ", image: "https://via.placeholder.com/50", quantity: 1 },
    ],
  },
  {
    id: "2",
    customer: "Trần Thị B",
    phone: "0976543210",
    address: "456 Đường XYZ, Hà Nội",
    status: 2,
    total: "300.000đ",
    items: [
      { name: "Sản phẩm 3", price: "300.000đ", image: "https://via.placeholder.com/50", quantity: 1 },
    ],
  },
];

const statusSteps = ["Chờ phê duyệt", "Đang đóng gói", "Đang vận chuyển", "Đã giao hàng"];

const OrderStatus = () => {
  const { id } = useParams();
  const order = orderData.find((o) => o.id === id);
  const [currentStatus, setCurrentStatus] = useState(order?.status || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(null);

  if (!order) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Đơn hàng không tồn tại.</p>;
  }

  const handleStepChange = (step) => {
    if (step >= 0 && step < statusSteps.length) {
      setNewStatus(step);
      setIsModalOpen(true);
    }
  };

  const confirmChange = () => {
    setCurrentStatus(newStatus);
    setIsModalOpen(false);
  };

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: "auto", boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)", marginTop: "100px", padding: "30px", borderRadius: "12px" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>Trạng thái đơn hàng #{id}</Title>
      <Steps current={currentStatus} status={currentStatus === 4 ? "error" : "process"} style={{ marginBottom: 30 }}>
        {statusSteps.map((step, index) => (
          <Steps.Step key={index} title={step} />
        ))}
      </Steps>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={12}><Text strong><UserOutlined /> Khách hàng:</Text> {order.customer}</Col>
        <Col span={12}><Text strong><PhoneOutlined /> Số điện thoại:</Text> {order.phone}</Col>
        <Col span={24}><Text strong><HomeOutlined /> Địa chỉ:</Text> {order.address}</Col>
        <Col span={24}><Text strong><DollarOutlined /> Tổng tiền:</Text> {order.total}</Col>
      </Row>
      <Divider />
      <Table
        dataSource={order.items}
        columns={[
          { title: "Ảnh", dataIndex: "image", key: "image", render: (src) => <img src={src} alt="Sản phẩm" width={50} style={{ borderRadius: 8 }} /> },
          { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
          { title: "Giá", dataIndex: "price", key: "price" },
          { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
        ]}
        pagination={false}
        rowKey={(record) => record.name}
      />
      <Divider />
      <Row justify="center">
        <Button disabled={currentStatus === statusSteps.length - 1} type="primary" size="large" onClick={() => handleStepChange(currentStatus + 1)}>Chuyển trạng thái đơn hàng</Button>
      </Row>
      <Modal
        title="Xác nhận thay đổi trạng thái"
        open={isModalOpen}
        onOk={confirmChange}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Chuyển trạng thái thành {statusSteps[newStatus]} ?</p>
      </Modal>
    </Card>
  );
};

export default OrderStatus;
