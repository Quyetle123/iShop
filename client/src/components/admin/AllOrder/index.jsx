import { Table, Space, Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderStatusStart } from "../../../redux/slices/orderSlice.jsx";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../utils/token.jsx";
import { getAccountStorebyAccountIdStart } from "../../../redux/slices/storeAccountSlice.jsx";

const statuses = [
  "Chờ phê duyệt",
  "Đang đóng gói",
  "Đang vận chuyển",
  "Đã giao hàng",
  "Đã hủy",
];


const AllOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {storeAccount} = useSelector((state) => state.storeAccounts);
  
    useEffect(() => {
      dispatch(getAccountStorebyAccountIdStart(getToken().id));
    }, [dispatch]);
  const { orderStatus } = useSelector((state) => state?.orders);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("Đang đóng gói");

  useEffect(() => {
    dispatch(
      getOrderStatusStart({
        storeid: storeAccount?.accountStore?.Store?.id,
        status: selectedStatus,
        page: currentPage,
        pageSize,
      })
    );
  }, [dispatch, selectedStatus, currentPage, pageSize, storeAccount]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleClick = (status) => {
    setCurrentPage(1);
    setSelectedStatus(status);
  };

  const orderColumns = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tổng đơn",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} ₫`,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Xã/ phường",
      dataIndex: "ward",
      key: "ward",
    },
    {
      title: "Quận/ huyện",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Tỉnh/ thành phố",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/admin/order/${record.id}`)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "25px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          background: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <Input.Search
          placeholder="Tìm kiếm đơn hàng..."
          style={{ width: 300, height: 40 }}
        />

        <Space size="middle">
          {statuses.map((status) => (
            <Button
              key={status}
              type={selectedStatus === status ? "primary" : "default"}
              onClick={() => handleClick(status)}
              style={{
                minWidth: 130,
                height: 40,
                fontWeight: "bold",
                borderColor: selectedStatus === status ? "#1890ff" : "#d9d9d9",
                color: selectedStatus === status ? "#fff" : "#1890ff",
                background: selectedStatus === status ? "#1890ff" : "white",
                transition: "0.3s",
              }}
            >
              {status}
            </Button>
          ))}
        </Space>
      </div>
      <Table
        className="mt-[50px]"
        columns={orderColumns}
        dataSource={orderStatus?.orders}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: orderStatus?.totalOrders,
          onChange: handlePageChange,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
        }}
      />
    </div>
  );
};

export default AllOrder;
