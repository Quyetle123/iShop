import { Table, Space, Typography, Button } from "antd";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getToken } from "../../../utils/token";
import { getOrderStart } from "../../../reudux/slices/orderSlice";
import { Link } from "react-router-dom";

const { Title } = Typography;

const MyOrder = () => {
  const token = getToken();
  const dispatch = useDispatch();
  
  const { orders } = useSelector((state) => state.orders);
  const orderList = Array.isArray(orders.orders) ? orders.orders : [];

  useEffect(() => {
    if (token?.id) {
      dispatch(getOrderStart(token.id));
    }
  }, [dispatch, token.id]);

  const orderDetailColumns = (status) => [
    {
      title: "Ảnh",
      dataIndex: "productImage",
      key: "productImage",
      render: (imageUrl) => (
        <S.OrderDetailImage
          style={{ width: "40px" }}
          src={imageUrl}
          alt="product"
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "productName",
      key: "productName",
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
      render: (price) => `${price} ₫`,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) =>
        status === "Đã giao hàng" ? (
          <Button type="primary" ghost>
            <Link to={`/comment/${record.productid}`}>Đánh giá sản phẩm</Link>
          </Button>
        ) : null,
    },
  ];

  return (
    <S.OrdersContainer>
      <Title level={2}>Tất cả đơn hàng</Title>
      {orderList.map((order) => (
        <S.StyledCard title={`Mã số đơn hàng: ${order.id}`} key={order.id}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <p>
              <strong>Tổng tiền:</strong> {order.total.toLocaleString("vi-VN")} ₫
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.address}, {order.city}
            </p>
            <p>
              <strong>Trạng thái:</strong> {order.status}
            </p>
            <Table
              columns={orderDetailColumns(order.status)}
              dataSource={order.OrderDetails.map((detail) => ({
                key: detail.id,
                productImage: detail.ProductColor.ProductImages[0]?.image || "", // First image URL
                productName: detail.ProductColor.Product.productname,
                quantity: detail.quantity,
                price: detail.price.toLocaleString("vi-VN"),
                productid: detail.ProductColor.Product.id,
              }))}
              pagination={false}
              rowKey="productid"
            />
          </Space>
        </S.StyledCard>
      ))}
    </S.OrdersContainer>
  );
};

export default MyOrder;
