import { useEffect, useState } from "react";
import * as S from "./style";
import { Button, Card, Form, Input, message, Select, Spin, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addStoreStart } from "../../../redux/slices/storeSlice";
import { v4 as uuidv4 } from "uuid";
import { registerStart } from "../../../redux/slices/authSlice";
import { addStoreAccountStart } from "../../../redux/slices/storeAccountSlice";
import { fetchAllBranchStart } from "../../../redux/slices/branchSlice";
import { fetchProvincesStart } from "../../../redux/slices/provinceSlice";
import { fetchDistrictByProvinceIdStart } from "../../../redux/slices/districtSlice";
import { fetchWardsByDistrictIdStart } from "../../../redux/slices/wardSlice";
import { useNavigate } from "react-router-dom";

const AddStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const { branches } = useSelector((state) => state.branches);
  const branchList = Array.isArray(branches.branches) ? branches.branches : [];

  useEffect(() => {
    dispatch(fetchAllBranchStart());
  }, [dispatch]);

  const { districts } = useSelector((state) => state.districts);
  const { wards } = useSelector((state) => state.wards);
  useEffect(() => {
    dispatch(fetchProvincesStart());
  }, [dispatch]);

  const districtList = Array.isArray(districts.district)
    ? districts.district
    : [];
  const wardList = Array.isArray(wards.wards) ? wards.wards : [];

  const handleBranchChange = (provinceCode) => {
    dispatch(fetchDistrictByProvinceIdStart(provinceCode));
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = (districtCode) => {
    dispatch(fetchWardsByDistrictIdStart(districtCode));
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
              {branchList.map((branch) =>
                branch.Province ? (
                  <Select.Option
                    key={branch.Province.province_id}
                    value={branch.Province.province_id}
                  >
                    {branch.Province.name}
                  </Select.Option>
                ) : null
              )}
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
                <Select.Option
                  key={district.district_id}
                  value={district.district_id}
                >
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
                <Select.Option key={ward.wards_id} value={ward.wards_id}>
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
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
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

  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const storeid = uuidv4();
      const adminid = uuidv4();
      const allData = { ...formData, ...values };

      setLoading(true);

      await dispatch(
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

      await dispatch(
        registerStart({
          id: adminid,
          username: allData.username,
          phoneNumber: allData.phoneNumber,
          email: allData.email,
          password: allData.password,
          role: "admin",
        })
      );

      await dispatch(
        addStoreAccountStart({
          storeid,
          accountid: adminid,
        })
      );

      message.success("Đã hoàn thành tạo cửa hàng!");
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
      navigate("/administrator/branch-store");
    }
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
            <Button type="primary" onClick={onFinish} disabled={loading}>
              {loading ? <Spin size="small" /> : "Hoàn thành"}
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
