import { useEffect, useState } from "react";
import {
  Card,
  List,
  Typography,
  Tag,
  Row,
  Col,
  DatePicker,
  Button,
  Empty,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../utils/token";
import { getAccountStorebyAccountIdStart } from "../../../redux/slices/storeAccountSlice";
import { fetchInventoryHistoriesByStoreIdStart } from "../../../redux/slices/inventoryHistorySlice";

const { Title, Text } = Typography;

const StockHistory = () => {
  const dispatch = useDispatch();
  const { storeAccount } = useSelector((state) => state.storeAccounts);
  const { inventoryHistories } = useSelector(
    (state) => state.inventoryHistories
  );
  const inventoryHistoryList = Array.isArray(
    inventoryHistories.inventoryHistories
  )
    ? inventoryHistories.inventoryHistories
    : [];
  console.log(inventoryHistoryList[0]?.ProductColor.Product.productname);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filterType, setFilterType] = useState(null);

  useEffect(() => {
    dispatch(getAccountStorebyAccountIdStart(getToken().id));
  }, [dispatch]);

  useEffect(() => {
    if (storeAccount?.accountStore?.Store?.id) {
      dispatch(
        fetchInventoryHistoriesByStoreIdStart({
          storeid: storeAccount.accountStore.Store.id,
          date: selectedDate,
        })
      );
    }
  }, [dispatch, selectedDate, storeAccount?.accountStore?.Store?.id]);

  const groupedHistory = inventoryHistoryList.reduce((acc, item) => {
    const date = dayjs(item.createdAt).format("YYYY-MM-DD");
    if (!acc[date]) acc[date] = [];
    acc[date].push({
      time: dayjs(item.createdAt).format("HH:mm:ss"),
      type: item.type.toLowerCase(),
      quantity: item.quantity,
      productName: item?.ProductColor?.Product?.productname,
      productImage: item?.ProductColor?.ProductImages[0]?.image,
    });
    return acc;
  }, {});

  return (
    <div style={{ padding: 20, margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Lịch Sử Xuất Nhập Kho
      </Title>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <DatePicker
            defaultValue={selectedDate}
            format="YYYY-MM-DD"
            onChange={(date) => setSelectedDate(date)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={6}>
          <Button
            type={filterType === "import" ? "primary" : "default"}
            icon={<ArrowDownOutlined />}
            onClick={() =>
              setFilterType(filterType === "import" ? null : "import")
            }
            style={{ width: "100%" }}
          >
            Nhập kho
          </Button>
        </Col>
        <Col span={6}>
          <Button
            type={filterType === "export" ? "primary" : "default"}
            icon={<ArrowUpOutlined />}
            onClick={() =>
              setFilterType(filterType === "export" ? null : "export")
            }
            style={{ width: "100%" }}
          >
            Xuất kho
          </Button>
        </Col>
        <Col span={6}>
          <Button
            type={!filterType ? "primary" : "default"}
            onClick={() => setFilterType(null)}
            style={{ width: "100%" }}
          >
            Tất cả
          </Button>
        </Col>
      </Row>
      {Object.keys(groupedHistory).length > 0 ? (
        Object.keys(groupedHistory).map((date) => (
          <Card
            key={date}
            style={{
              marginBottom: 20,
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Title level={4} style={{ marginBottom: 10 }}>
              {date}
            </Title>
            <List
              dataSource={groupedHistory[date].filter(
                (item) => !filterType || item.type === filterType
              )}
              renderItem={(item) => (
                <List.Item>
                  <Row style={{ width: "100%" }} align="middle">
                    <Col span={3} style={{ textAlign: "center" }}>
                      {item.type === "import" ? (
                        <CheckCircleOutlined
                          style={{ color: "green", fontSize: 20 }}
                        />
                      ) : (
                        <CloseCircleOutlined
                          style={{ color: "red", fontSize: 20 }}
                        />
                      )}
                    </Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                      <Text strong>{item.time}</Text>
                    </Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                      {item.type === "import" ? (
                        <Tag color="green">Nhập kho</Tag>
                      ) : (
                        <Tag color="red">Xuất kho</Tag>
                      )}
                    </Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                      <Text>{item.quantity} sản phẩm</Text>
                    </Col>
                    <Col span={5} style={{ textAlign: "center" }}>
                      <Text strong>{item?.productName}</Text>
                    </Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                      {item.productImage && (
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          style={{ width: 50, height: 50, borderRadius: 5 }}
                        />
                      )}
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Card>
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            padding: 20,
            borderRadius: 10,
            backgroundColor: "#f5f5f5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Empty
            description={
              <Text style={{ fontSize: 16, color: "#888" }}>
                <FileTextOutlined
                  style={{ fontSize: 24, color: "#bbb", marginBottom: 5 }}
                />
                <br />
                Không có lịch sử xuất nhập kho
              </Text>
            }
          />
        </div>
      )}
    </div>
  );
};

export default StockHistory;
