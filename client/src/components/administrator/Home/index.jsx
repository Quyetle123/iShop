import { Card, Col, Row, Statistic, Button, DatePicker, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchGeneralStatisticalStart,
  fetchOrderStatisticMonthStart,
} from "../../../redux/slices/administratorStatisticalSlice";
import dayjs from "dayjs";

import {
  ShoppingCartOutlined,
  DollarCircleOutlined,
  ShopOutlined,
  BranchesOutlined,
  UserOutlined,
  ClockCircleOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Bar } from "react-chartjs-2";

const { RangePicker } = DatePicker;

const Container = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledCol = styled(Col)`
  flex: 1;
  min-width: 200px;
`;

const StyledCard = styled(Card)`
  text-align: center;
  border-radius: 12px;
  width: 100%;
`;

const IconWrapper = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const AdminStratorHome = () => {
  const dispatch = useDispatch();
  const [typeTime, setTypeTime] = useState("all");
  const [dateRangeGeneral, setDateRangeGeneral] = useState(null);
  const currentDate = dayjs();
  const { generalStatisticals } = useSelector(
    (state) => state.administratorStatisticals
  );

  useEffect(() => {
    const payload =
      typeTime === "custom" && dateRangeGeneral
        ? {
            type: "custom",
            startMonth: dateRangeGeneral[0].month() + 1,
            startYear: dateRangeGeneral[0].year(),
            endMonth: dateRangeGeneral[1].month() + 1,
            endYear: dateRangeGeneral[1].year(),
          }
        : { type: typeTime };

    dispatch(fetchGeneralStatisticalStart(payload));
  }, [dispatch, typeTime, dateRangeGeneral]);

  const handleTimeFilter = (type) => {
    setTypeTime(type);
    setDateRangeGeneral(null);
  };

  const handleRangeChange = (dates) => {
    if (dates && dates[1].isAfter(currentDate, "month")) return;
    setDateRangeGeneral(dates);
    setTypeTime("custom");
  };

  const [dateRangeOrder, setDateRangeOrder] = useState([
    currentDate.subtract(6, "month"),
    currentDate,
  ]);

  const { orderStaticMonth } = useSelector(
    (state) => state.administratorStatisticals
  );
  console.log(orderStaticMonth);

  useEffect(() => {
    dispatch(
      fetchOrderStatisticMonthStart({
        startMonth: dateRangeOrder[0].month() + 1,
        startYear: dateRangeOrder[0].year(),
        endMonth: dateRangeOrder[1].month() + 1,
        endYear: dateRangeOrder[1].year(),
      })
    );
  }, [dispatch, dateRangeOrder]);

  const stats = [
    {
      title: "Tổng Đơn Hàng",
      value: generalStatisticals.totalOrders,
      icon: <ShoppingCartOutlined />,
      color: "#1890ff",
    },
    {
      title: "Tổng Doanh Thu",
      value: generalStatisticals.totalRevenue?.toLocaleString() + " đ",
      icon: <DollarCircleOutlined />,
      color: "#52c41a",
    },
    {
      title: "Tổng Cửa Hàng",
      value: generalStatisticals.totalStores,
      icon: <ShopOutlined />,
      color: "#faad14",
    },
    {
      title: "Tổng Chi Nhánh",
      value: generalStatisticals.totalBranches,
      icon: <BranchesOutlined />,
      color: "#eb2f96",
    },
    {
      title: "Tổng Người Dùng",
      value: generalStatisticals.totalUsers,
      icon: <UserOutlined />,
      color: "#722ed1",
    },
  ];

  return (
    <Container>
      <FilterContainer>
        <Space>
          <Button
            type={typeTime === "all" ? "primary" : "default"}
            onClick={() => handleTimeFilter("all")}
            icon={<AppstoreOutlined />}
          >
            Tất cả
          </Button>
          <Button
            type={typeTime === "today" ? "primary" : "default"}
            onClick={() => handleTimeFilter("today")}
            icon={<ClockCircleOutlined />}
          >
            Hôm nay
          </Button>
          <Button
            type={typeTime === "thisWeek" ? "primary" : "default"}
            onClick={() => handleTimeFilter("thisWeek")}
            icon={<FieldTimeOutlined />}
          >
            Tuần này
          </Button>
          <Button
            type={typeTime === "thisMonth" ? "primary" : "default"}
            onClick={() => handleTimeFilter("thisMonth")}
            icon={<CalendarOutlined />}
          >
            Tháng này
          </Button>
          <RangePicker
            picker="month"
            onChange={handleRangeChange}
            value={dateRangeGeneral}
            disabledDate={(current) =>
              current && current.isAfter(currentDate, "month")
            }
          />
        </Space>
      </FilterContainer>
      <StyledRow>
        {stats.map((stat, index) => (
          <StyledCol key={index}>
            <StyledCard
              bordered
              style={{ borderTop: `4px solid ${stat.color}` }}
            >
              <IconWrapper style={{ color: stat.color }}>
                {stat.icon}
              </IconWrapper>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{
                  color: stat.color,
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              />
            </StyledCard>
          </StyledCol>
        ))}
      </StyledRow>

      <div className="w-full flex flex-col">
        <h2 className="mt-[20px]">Thống kê số đơn hàng theo tháng</h2>
        <RangePicker
          className="mb-[20px] items-end w-[300px]"
          picker="month"
          onChange={(dates) => {
            if (dates && dates[1].isAfter(currentDate, "month")) {
              return;
            }
            setDateRangeOrder(dates);
          }}
          value={dateRangeOrder}
          disabledDate={(current) =>
            current && current.isAfter(currentDate, "month")
          }
        />
        <Card className="w-full">
          {orderStaticMonth &&
          orderStaticMonth.labels &&
          orderStaticMonth.datasets ? (
            <Bar data={orderStaticMonth} options={{ responsive: true }} />
          ) : (
            <p>Loading...</p>
          )}
        </Card>
      </div>
    </Container>
  );
};

export default AdminStratorHome;
