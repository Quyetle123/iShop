import { useEffect, useState } from "react";
import * as S from "./style";
import { Button, Card, Form, Input, message, Select, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addStoreStart } from "../../../reudux/slices/storeSlice";
import { v4 as uuidv4 } from "uuid";
import { registerStart } from "../../../reudux/slices/authSlice";
import { addStoreAccountStart } from "../../../reudux/slices/storeAccountSlice";
import { fetchAllBranchStart } from "../../../reudux/slices/branchSlice";

const AddStore = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const { branches } = useSelector((state) => state.branches);
  const branchList = Array.isArray(branches.branches) ? branches.branches : [];

  useEffect(() => {
    dispatch(fetchAllBranchStart());
  }, [dispatch]);

  console.log(branchList);

  const steps = [
    {
      title: "Tạo cửa hàng",
      content: (
        <Form form={form} layout="vertical" name="storeForm">
          <Form.Item
            label="Tên cửa hàng"
            name="storename"
            rules={[{ required: true, message: "Vui lòng nhập tên cửa hàng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chi nhánh"
            name="branchid"
            rules={[
              { required: true, message: "Vui lòng nhập tên chi nhánh!" },
            ]}
          >
            <Select placeholder="Chọn chi nhánh">
              {branchList.map((branch) => (
                <Select.Option key={branch.id}>
                  {branch.branchname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Tạo tài khoản quản lí",
      content: (
        <Form form={form} layout="vertical" name="managerForm">
          <Form.Item
            label="Tên tài khoản"
            name="managerUsername"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="managerPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="managerEmail"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Tạo tài khoản nhân viên xử lí đơn hàng",
      content: (
        <Form form={form} layout="vertical" name="supportForm">
          <Form.Item
            label="Tên tài khoản"
            name="supportUsername"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="supportPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="supportEmail"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
    },
  ];

  const next = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData((prevData) => ({ ...prevData, ...values }));
        setCurrent(current + 1);
      })
      .catch(() => {
        message.error("Vui lòng hoàn thành tất cả các trường bắt buộc.");
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        const storeid = uuidv4();
        const managerid = uuidv4();
        const supportid = uuidv4();
        const allData = { ...formData, ...values };
        dispatch(
          addStoreStart({
            id: storeid,
            storename: allData.storename,
            address: allData.address,
            phoneNumber: allData.phoneNumber,
            branchid: allData.branchid,
          })
        );

        dispatch(
          registerStart({
            id: managerid,
            username: allData.managerUsername,
            email: allData.managerEmail,
            password: allData.managerPassword,
            role: "Manager",
          })
        );

        dispatch(
          registerStart({
            id: supportid,
            username: allData.supportUsername,
            email: allData.supportEmail,
            password: allData.supportPassword,
            role: "Support",
          })
        );

        dispatch(
          addStoreAccountStart({
            storeid,
            accountid: managerid,
          })
        );

        dispatch(
          addStoreAccountStart({
            storeid,
            accountid: supportid,
          })
        );

        message.success("Đã hoàn thành tạo cửa hàng!");
      })
      .catch(() => {
        message.error("Vui lòng hoàn thành tất cả các trường bắt buộc.");
      });
  };

  return (
    <S.Container>
      <Card>
        <Steps current={current}>
          {steps.map((step, index) => (
            <Steps.Step key={index} title={step.title} />
          ))}
        </Steps>
      </Card>
      <Card className="mt-6">
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action" style={{ marginTop: "20px" }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Tiếp theo
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={onFinish}>
              Hoàn thành
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={prev}>
              Quay lại
            </Button>
          )}
        </div>
      </Card>
    </S.Container>
  );
};

export default AddStore;
