/* eslint-disable react/jsx-key */
import { Card, Avatar, Button, Statistic, Row, Col, List, Tag } from "antd";
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Container = styled.div`
  padding: 20px;
  margin-top: 80px;
`;

const ScrollableList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
`;

const orderStats = [
  { title: "Đang gói hàng", value: 12, icon: <SyncOutlined />, color: "#1890ff", total: 1200000 },
  { title: "Đang giao", value: 8, icon: <ShoppingCartOutlined />, color: "#ffc107", total: 800000 },
  { title: "Thành công", value: 24, icon: <CheckCircleOutlined />, color: "#52c41a", total: 2400000 },
  { title: "Đã hủy", value: 5, icon: <CloseCircleOutlined />, color: "#ff4d4f", total: 500000 },
];

const pendingOrders = [
  { id: 1, name: "Nguyễn Văn A", avatar: "https://i.pravatar.cc/50", date: "2025-02-03 14:30", products: 3, price: 450000 },
  { id: 2, name: "Trần Thị B", avatar: "https://i.pravatar.cc/51", date: "2025-02-03 13:15", products: 2, price: 300000 },
  { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/52", date: "2025-02-03 12:00", products: 5, price: 750000 },
  { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/52", date: "2025-02-03 12:00", products: 5, price: 750000 },
  { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/52", date: "2025-02-03 12:00", products: 5, price: 750000 },
  { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/52", date: "2025-02-03 12:00", products: 5, price: 750000 },
  { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/52", date: "2025-02-03 12:00", products: 5, price: 750000 },
  { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/52", date: "2025-02-03 12:00", products: 5, price: 750000 },
  { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/52", date: "2025-02-03 12:00", products: 5, price: 750000 },
];

const productData = {
  labels: ["iPhone", "iPad", "Mac", "Watch", "Tai nghe - Loa", "Phụ kiện"],
  datasets: [
    {
      label: "Số lượng sản phẩm",
      data: [50, 30, 20, 25, 40, 35],
      backgroundColor: "#1890ff",
    },
  ],
};

const orderMonthData = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  datasets: [
    {
      label: "Số đơn hàng",
      data: [120, 150, 180, 200, 220, 250],
      backgroundColor: "#ff7f50",
    },
  ],
};

const revenueData = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  datasets: [
    {
      label: "Doanh thu (VNĐ)",
      data: [12000000, 15000000, 18000000, 16000000, 20000000, 22000000],
      borderColor: "#52c41a",
      backgroundColor: "rgba(82, 196, 26, 0.2)",
      fill: true,
    },
  ],
};

const AdminHome = () => {
  return (
    <Container>
      <Row gutter={[16, 16]}>
        {orderStats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card bordered style={{ textAlign: "center", borderTop: `5px solid ${stat.color}` }}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
              <p style={{ marginTop: 10, fontWeight: "bold", color: stat.color }}>
                Tổng tiền: {stat.total.toLocaleString()} VNĐ
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 style={{ marginTop: 20 }}>Đơn hàng chờ duyệt</h2>
      <Card>
        <ScrollableList>
          <List
            itemLayout="horizontal"
            dataSource={pendingOrders}
            renderItem={(order) => (
              <List.Item actions={[<Button type="primary">Phê duyệt</Button>]}> 
                <List.Item.Meta
                  avatar={<Avatar src={order.avatar} />}
                  title={order.name}
                  description={`Ngày đặt: ${order.date}`}
                />
                <Tag color="gold">Chờ phê duyệt</Tag>
                <span>{order.products} sản phẩm</span>
                <strong>{order.price.toLocaleString()} VNĐ</strong>
              </List.Item>
            )}
          />
        </ScrollableList>
      </Card>

      <h2 style={{ marginTop: 20 }}>Thống kê số lượng sản phẩm</h2>
      <Card>
        <Bar data={productData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </Card>

      <h2 style={{ marginTop: 20 }}>Thống kê số đơn hàng theo tháng</h2>
      <Card>
        <Bar data={orderMonthData} options={{ responsive: true }} />
      </Card>

      <h2 style={{ marginTop: 20 }}>Thống kê doanh thu 6 tháng gần đây</h2>
      <Card>
        <Line data={revenueData} options={{ responsive: true }} />
      </Card>
    </Container>
  );
};

export default AdminHome;
