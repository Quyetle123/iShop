/* eslint-disable react/jsx-key */
import { Card, Avatar, Button, Statistic, Row, Col, List, Tag, DatePicker } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { orderStatisticStart } from "../../../reudux/slices/orderSlice";
import { productStatisticStart } from "../../../reudux/slices/categorySlice";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const { RangePicker } = DatePicker;

const Container = styled.div`
  padding: 20px;
  margin-top: 80px;
`;

const ScrollableList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
`;

const pendingOrders = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/50",
    date: "2025-02-03 14:30",
    products: 3,
    price: 450000,
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "https://i.pravatar.cc/51",
    date: "2025-02-03 13:15",
    products: 2,
    price: 300000,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/52",
    date: "2025-02-03 12:00",
    products: 5,
    price: 750000,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/52",
    date: "2025-02-03 12:00",
    products: 5,
    price: 750000,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/52",
    date: "2025-02-03 12:00",
    products: 5,
    price: 750000,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/52",
    date: "2025-02-03 12:00",
    products: 5,
    price: 750000,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/52",
    date: "2025-02-03 12:00",
    products: 5,
    price: 750000,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/52",
    date: "2025-02-03 12:00",
    products: 5,
    price: 750000,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/52",
    date: "2025-02-03 12:00",
    products: 5,
    price: 750000,
  },
];

const initialData = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  datasets: [
    {
      label: "Đang đóng gói",
      data: [30, 40, 50, 60, 70, 80],
      backgroundColor: "#ff7f50",
    },
    {
      label: "Đang vận chuyển",
      data: [20, 30, 40, 50, 60, 70],
      backgroundColor: "#6495ed",
    },
    {
      label: "Đã giao hàng",
      data: [50, 60, 70, 80, 90, 100],
      backgroundColor: "#32cd32",
    },
    {
      label: "Đã hủy",
      data: [10, 15, 20, 25, 30, 35],
      backgroundColor: "#ff0000",
    },
  ],
};

const statusMapping = {
  "Đang đóng gói": { color: "#1890ff", icon: <SyncOutlined /> },
  "Đang vận chuyển": { color: "#ffc107", icon: <ShoppingCartOutlined /> },
  "Đã giao hàng": { color: "#52c41a", icon: <CheckCircleOutlined /> },
  "Đã hủy": { color: "#ff4d4f", icon: <CloseCircleOutlined /> },
};

const AdminHome = () => {
  const dispatch = useDispatch();
  const { orderStatistics } = useSelector((state) => state.orders);
  const orderStatisticList = Array.isArray(orderStatistics)
    ? orderStatistics
    : [];
  console.log(orderStatistics);
  const { productStatistic } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(orderStatisticStart());
    dispatch(productStatisticStart());
  }, [dispatch]);

  const [orderData, setOrderData] = useState(initialData);
  const handleDateChange = (dates) => {
    if (dates) {
      const startMonth = dayjs(dates[0]).month() + 1;
      const endMonth = dayjs(dates[1]).month() + 1;
      
      const filteredLabels = initialData.labels.filter((label, index) => {
        const monthNumber = index + 1;
        return monthNumber >= startMonth && monthNumber <= endMonth;
      });
      
      const filteredDatasets = initialData.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.slice(startMonth - 1, endMonth)
      }));
      
      setOrderData({ labels: filteredLabels, datasets: filteredDatasets });
    }
  };
  return (
    <Container>
      <Row gutter={[16, 16]}>
        {orderStatisticList.map((order, index) => {
          const { color, icon } = statusMapping[order.status] || {};
          return (
            <Col key={index} span={6}>
              {" "}
              <Card
                bordered
                style={{ textAlign: "center", borderTop: `5px solid ${color}` }}
              >
                <Statistic
                  title={order.status}
                  value={order.totalOrders}
                  prefix={icon}
                  valueStyle={{ color }}
                />
                <p style={{ marginTop: 10, fontWeight: "bold", color }}>
                  Tổng tiền: {order.totalAmount.toLocaleString()} VNĐ
                </p>
              </Card>
            </Col>
          );
        })}
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
        <Bar
          data={
            productStatistic && productStatistic.labels
              ? productStatistic
              : { labels: [], datasets: [] }
          }
          options={{
            responsive: true,
            plugins: { legend: { display: true } },
          }}
        />
      </Card>

      <h2 style={{ marginTop: 20 }}>Thống kê số đơn hàng theo tháng</h2>
      <RangePicker
        picker="month"
        onChange={handleDateChange}
        style={{ marginBottom: 20 }}
      />
      <Card>
        <Bar data={orderData} options={{ responsive: true }} />
      </Card>

      {/* <h2 style={{ marginTop: 20 }}>Thống kê doanh thu 6 tháng gần đây</h2>
      <Card>
        <Line data={revenueData} options={{ responsive: true }} />
      </Card> */}
    </Container>
  );
};

export default AdminHome;
