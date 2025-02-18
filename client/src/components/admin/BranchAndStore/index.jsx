import { Card, Form, Input, Modal, Table, Tooltip } from "antd";
import * as S from "./style";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  addBranchStart,
  fetchAllBranchStart,
} from "../../../redux/slices/branchSlice";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const BranchAndStore = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    dispatch(
      addBranchStart({
        branchname: values.branchname,
        description: values.description,
      })
    );
    setIsModalOpen(false);
  };

  const { branches } = useSelector((state) => state.branches);
  const branchList = Array.isArray(branches.branches) ? branches.branches : [];

  useEffect(() => {
    dispatch(fetchAllBranchStart());
  }, [dispatch]);
  console.log(branchList);

  const data = branchList.map((branch) => ({
    branch: branch.branchname,
    storeCount: branch.Stores.length,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "storename",
      key: "storename",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  return (
    <S.Container>
      <S.AddButton onClick={showModal}>+</S.AddButton>
      <Modal
        title="Thêm chi nhánh"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Tên chi nhánh"
            name="branchname"
            rules={[
              {
                required: true,
                message: "Chưa điền tên chi nhánh!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới thiệu"
            name="description"
            rules={[
              {
                required: true,
                message: "Chưa điền giới thiệu!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <Card>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

            <XAxis dataKey="branch" tick={{ fontSize: 14, fill: "#555" }} />

            <YAxis tick={{ fontSize: 14, fill: "#555" }}>
              <LabelList dataKey="storeCount" position="top" />
            </YAxis>

            <Tooltip cursor={{ fill: "rgba(200, 200, 200, 0.3)" }} />

            <Legend verticalAlign="top" height={36} />

            <Bar
              dataKey="storeCount"
              fill="url(#colorUv)"
              name="Số cửa hàng"
              barSize={50}
            >
              <LabelList
                dataKey="storeCount"
                position="top"
                style={{ fontSize: 14, fill: "#000" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="mt-6">
        {branchList.map((branch) => (
          <div key={branch.id}>
            <S.BranchName>Chi nhánh {branch.branchname}</S.BranchName>
            <Table
              dataSource={branch.Stores.map((store, idx) => ({
                key: store.id,
                stt: idx + 1,
                storename: store.storename,
                address: store.address,
                phoneNumber: store.phoneNumber,
              }))}
              columns={columns}
              pagination={false}
            />
          </div>
        ))}
      </Card>
    </S.Container>
  );
};

export default BranchAndStore;
