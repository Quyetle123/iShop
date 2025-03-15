import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Steps,
  Modal,
  Card,
  Typography,
  Row,
  Col,
  Divider,
  Button,
  Table,
  Image,
} from "antd";
import {
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByIdStart, updateStatusStart } from "../../../redux/slices/orderSlice";
import { socket } from "../../../utils/socket";

const { Title, Text } = Typography;

const statusSteps = [
  "Chờ phê duyệt",
  "Đang đóng gói",
  "Đang vận chuyển",
  "Đã giao hàng",
];

const OrderStatus = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderById } = useSelector((state) => state.orders);

  const order = orderById?.order;

  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    if (order?.status) {
      setCurrentStatus(statusSteps.indexOf(order.status) || 0);
    }
  }, [order]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(null);

  useEffect(() => {
    dispatch(getOrderByIdStart(id));
  }, [id, dispatch]);

  const handleStepChange = (step) => {
    if (step >= 0 && step < statusSteps.length) {
      setNewStatus(step);
      setIsModalOpen(true);
    }
  };

  const confirmChange = () => {
    setCurrentStatus(newStatus);
    setIsModalOpen(false);
    dispatch(updateStatusStart({id, status: statusSteps[newStatus]}));
    if (statusSteps[newStatus] === "Đang vận chuyển") {
      socket.emit("sendMessage", {
        message: `Đơn hàng ${id} của bạn đã được bàn giao cho đơn vị vận chuyển`,
        accountid: order.accountid,
      });
    } else if (statusSteps[newStatus] === "Đã giao hàng") {
      socket.emit("sendMessage", {
        message:
          "Đơn hàng của bạn đã được giao. Hãy viết bình luận đánh giá về sản phẩm",
        accountid: order.accountid,
      });
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (src) => <Image width={50} src={src} />,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")} ₫`,
    },
  ];

  const dataSource = (order?.OrderDetails ?? []).map((product) => ({
    key: product?.id ?? "",
    image: product?.ProductColor?.ProductImages?.[0]?.image ?? "",
    name: product?.ProductColor?.Product?.productname ?? "Không có tên",
    quantity: product?.quantity ?? 0,
    price: product?.price ?? 0,
  }));
  

  return (
    <Card
      bordered={false}
      style={{
        maxWidth: 900,
        margin: "auto",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
        marginTop: "50px",
        padding: "30px",
        borderRadius: "12px",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
        Trạng thái đơn hàng {id}
      </Title>

      <Steps
        current={currentStatus}
        status={currentStatus === 4 ? "error" : "process"}
        style={{ marginBottom: 30 }}
      >
        {statusSteps.map((step, index) => (
          <Steps.Step key={index} title={step} />
        ))}
      </Steps>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text strong>
            <UserOutlined /> Khách hàng:
          </Text>{" "}
          {order?.username}
        </Col>
        <Col span={12}>
          <Text strong>
            <PhoneOutlined /> Số điện thoại:
          </Text>{" "}
          {order?.phoneNumber}
        </Col>
        <Col span={12}>
          <Text strong>
            <DollarOutlined /> Tổng tiền:
          </Text>{" "}
          {order?.total.toLocaleString("vi-VN")} ₫
        </Col>
        <Col span={12}>
          <Text strong>
            <CreditCardOutlined /> Phương thức thanh toán:
          </Text>{" "}
          {order?.payMethod}
        </Col>
        <Col span={24}>
          <Text strong>
            <HomeOutlined /> Địa chỉ:
          </Text>{" "}
          {order?.address}, {order?.ward}, {order?.district}, {order?.city}
        </Col>
      </Row>

      <Divider />

      <Title level={4} style={{ marginBottom: 15 }}>
        Chi tiết đơn hàng
      </Title>
      <Table columns={columns} dataSource={dataSource} pagination={false} />

      <Divider />
      <Row justify="center">
        <Button
          disabled={currentStatus === statusSteps.length - 1}
          type="primary"
          size="large"
          onClick={() => handleStepChange(currentStatus + 1)}
        >
          Chuyển trạng thái đơn hàng
        </Button>
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
