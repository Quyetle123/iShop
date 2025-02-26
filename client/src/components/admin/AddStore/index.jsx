import { useEffect, useState } from "react";
import * as S from "./style";
import { Button, Card, Form, Input, message, Select, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addStoreStart } from "../../../redux/slices/storeSlice";
import { v4 as uuidv4 } from "uuid";
import { registerStart } from "../../../redux/slices/authSlice";
import { addStoreAccountStart } from "../../../redux/slices/storeAccountSlice";
import { fetchAllBranchStart } from "../../../redux/slices/branchSlice";
import {
  fetchDistrictsStart,
  fetchProvincesStart,
  fetchWardsStart,
} from "../../../redux/slices/addressSlice";
import { findNameAddress } from "../../../utils/findAddress";

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

  const { provinces, districts, wards } = useSelector(
    (state) => state.addresses
  );

    useEffect(() => {
      dispatch(fetchProvincesStart());
    }, [dispatch]);

  const provinceList = Array.isArray(provinces) ? provinces : [];
  const districtList = Array.isArray(districts.districts)
    ? districts.districts
    : [];
  const wardList = Array.isArray(wards.wards) ? wards.wards : [];

  const handleBranchChange = (provinceCode) => {
    console.log(provinceCode)
    dispatch(fetchDistrictsStart(provinceCode));
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = (districtCode) => {
    dispatch(fetchWardsStart(districtCode));
    form.setFieldsValue({ ward: undefined });
  };

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
            label="Chi nhánh"
            name="branchid"
            rules={[
              { required: true, message: "Vui lòng nhập tên chi nhánh!" },
            ]}
          >
            <Select placeholder="Chọn chi nhánh" onChange={handleBranchChange}>
              {branchList.map((branch) => (
                <Select.Option key={branch.branchname} value={branch.branchname}>
                  {findNameAddress(provinceList, branch.branchname)?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quận huyện"
            name="district"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn quận huyện",
              },
            ]}
          >
            <Select
              placeholder="Chọn quận huyện"
              onChange={handleDistrictChange}
            >
              {districtList.map((district) => (
                <Select.Option key={district.code} value={district.code}>
                  {district.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Phường xã"
            name="ward"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phường xã",
              },
            ]}
          >
            <Select placeholder="Chọn phường xã">
              {wardList.map((ward) => (
                <Select.Option key={ward.code} value={ward.code}>
                  {ward.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Tạo tài khoản quản lí",
      content: (
        <Form form={form} layout="vertical" name="managerForm">
        <Form.Item
            label="Họ và tên"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên!" },
            ]}
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
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
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
        const adminid = uuidv4();
        const allData = { ...formData, ...values };
        dispatch(
          addStoreStart({
            id: storeid,
            storename: allData.storename,
            branchid: allData.branchid,
            district: allData.district,
            ward: allData.ward,
            address: allData.address,
            status: "Cần khởi tạo",
          })
        );

        dispatch(
          registerStart({
            id: adminid,
            username: allData.username,
            phoneNumber: allData.phoneNumber,
            email: allData.email,
            password: allData.password,
            role: "admin",
          })
        );

        dispatch(
          addStoreAccountStart({
            storeid,
            accountid: adminid,
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
