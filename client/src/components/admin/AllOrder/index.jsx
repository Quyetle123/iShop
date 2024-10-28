import { Table, Select } from "antd";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderStart,
  updateStatusStart,
} from "../../../reudux/slices/orderSlice.jsx";

const { Option } = Select;

const socket = io("http://localhost:5000");


// eslint-disable-next-line react/prop-types
const OrderDetailsTable = ({ details }) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => <S.OrderDetailImage src={imageUrl} alt="product" />,
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")} ₫`,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={details}
      pagination={false}
      rowKey="id"
    />
  );
};

const AllOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  const orderList = Array.isArray(orders.orders) ? orders.orders : [];

  useEffect(() => {
    dispatch(getAllOrderStart());
  }, [dispatch]);

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const handleStatusChange = (status, id, accountid) => {
    dispatch(updateStatusStart({ id, status }));
    if (status === "Đang vận chuyển") {
      socket.emit("sendMessage", {
        message: `Đơn hàng ${id} của bạn đã được bàn giao cho đơn vị vận chuyển`,
        accountid,
      });
    } else if (status === "Đã giao hàng") {
      socket.emit("sendMessage", {
        message:
          "Đơn hàng của bạn đã được giao. Hãy viết bình luận đánh giá về sản phẩm",
        accountid,
      });
    }
    window.location.reload();
  };

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} ₫`,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 200 }}
          onChange={(value) =>
            handleStatusChange(value, record.id, record.accountid)
          }
        >
          <Option value="Đang đóng gói">Đang đóng gói</Option>
          <Option value="Đang vận chuyển">Đang vận chuyển</Option>
          <Option value="Đã giao hàng">Đã giao hàng</Option>
        </Select>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const orderDetails = record.OrderDetails || [];
    return <OrderDetailsTable details={orderDetails} />;
  };

  const onExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([record.id]);
    } else {
      setExpandedRowKeys([]);
    }
  };

  return (
    <div style={{padding: '25px', marginTop: '80px'}}>
      <Table
        columns={orderColumns}
        dataSource={orderList}
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand,
        }}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default AllOrder; 