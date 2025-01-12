import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Space,
  Steps,
  Switch,
  Upload,
} from "antd";
import * as S from "./style";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { uploadImageToFirebase } from "../../../firebase/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { addVourcherStart } from "../../../reudux/slices/vourcherSlice";
import { fetchProductesStart } from "../../../reudux/slices/productSlice";
import { fetchAccountsStart } from "../../../reudux/slices/authSlice";
import { addVoucherAccountStart } from "../../../reudux/slices/voucherAccountSlice";
import { addVoucherProductStart } from "../../../reudux/slices/voucherProductSlice";
const { RangePicker } = DatePicker;

const AddVourcher = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const productList = Array.isArray(products.products) ? products.products : [];

  const { accounts } = useSelector((state) => state.auth);
  const accountList = Array.isArray(accounts.accounts) ? accounts.accounts : [];

  useEffect(() => {
    dispatch(fetchAccountsStart());
    dispatch(fetchProductesStart());
  }, [dispatch]);
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState();
  const [imageFile, setImageFile] = useState(null);
  const onChange = (checked) => {
    setStatus(checked);
  };

  const [chooseProduct, setChooseProduct] = useState("Tất cả");
  const [chooseAccount, setChooseAccount] = useState("Tất cả");
  const [quantityUse, setQuantityUse] = useState("Mỗi người tối đa 1 lần");

  const handleImageUpload = ({ file }) => {
    if (file.type.startsWith("image/")) {
      setImageFile(file);
      message.success(`Tải ảnh ${file.name} thành công!`);
    } else {
      message.error("Chỉ được phép tải ảnh!");
    }
  };

  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedAccount, setSelectedAccount] = useState();

  const handleChooseProduct = (value) => {
    setSelectedProduct(value);
  };

  const handleChooseAccount = (value) => {
    setSelectedAccount(value);
  };

  console.log(selectedProduct);

  const steps = [
    {
      title: "Loại voucher",
      content: (
        <div>
          <Form layout="vertical">
            <Form.Item label="Áp dụng cho sản phẩm:">
              <Select
                defaultValue={chooseProduct}
                onChange={(value) => setChooseProduct(value)}
                options={[
                  { value: "Tất cả", label: "Tất cả" },
                  { value: "Sản phẩm chỉ định", label: "Sản phẩm chỉ định" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Áp dụng cho tài khoản:">
              <Select
                defaultValue={chooseAccount}
                onChange={(value) => setChooseAccount(value)}
                options={[
                  { value: "Tất cả", label: "Tất cả" },
                  {
                    value: "Khách hàng chỉ định",
                    label: "Khách hàng chỉ định",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label="Lượt sử dụng:">
              <Select
                defaultValue={quantityUse}
                onChange={(value) => setQuantityUse(value)}
                options={[
                  {
                    value: "Mỗi người tối đa 1 lần",
                    label: "Mỗi người tối đa 1 lần",
                  },
                  {
                    value: "Giới hạn số lượng",
                    label: "Giới hạn số lượng",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Tạo voucher",
      content: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item
            label="Mã code"
            name="code"
            rules={[
              { required: true, message: "Mã code không được để trống!" },
            ]}
          >
            <Input placeholder="Nhập mã code" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Chưa điền mô tả!",
              },
            ]}
          >
            <TextArea showCount maxLength={500} placeholder="can resize" />
          </Form.Item>

          <Form.Item
            label="Số tiền giảm giá (Có thể bỏ trống nếu giảm theo %)"
            name="discount_amount"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Nhập số tiền giảm giá" />
          </Form.Item>

          <Form.Item
            label="Phần trăm giảm giá (Có thể bỏ trống nếu giảm theo số tiền)"
            name="discount_percent"
            rules={[{ required: false }]}
          >
            <Input placeholder="Nhập phần trăm giảm giá" />
          </Form.Item>

          <Form.Item
            label="Số tiền giảm giá tối đa (Có thể bỏ trống)"
            name="titlmax_discount_amount"
            rules={[{ required: false }]}
          >
            <Input placeholder="Nhập số tiền giảm giá" />
          </Form.Item>

          <Form.Item
            label="Giá trị đơn hàng tối thiểu (Có thể bỏ trống)"
            name="minimum_order_value"
            rules={[{ required: false }]}
          >
            <Input placeholder="Nhập giá trị đơn hàng tối thiểu" />
          </Form.Item>

          <Form.Item
            label="Thời gian:"
            name="time"
            rules={[
              { required: true, message: "Thời gian không được để trống!" },
            ]}
          >
            <RangePicker showTime />
          </Form.Item>

          <Form.Item label="Ảnh chính">
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              onChange={handleImageUpload}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Trạng thái: ">
            <Switch defaultChecked onChange={onChange} />
          </Form.Item>
        </Form>
      ),
    },
    chooseProduct === "Sản phẩm chỉ định" && {
      title: "Chọn sản phẩm",
      content: (
        <div>
          <Select
            id="product"
            mode="multiple"
            style={{
              width: "100%",
              padding: "2px",
            }}
            placeholder="Chọn sản phẩm"
            onChange={handleChooseProduct}
            options={productList.map((product) => ({
              value: product.id,
              label: (
                <Space>
                  <img
                    className="w-[20px]"
                    src={
                      product.ProductColors[0].ProductImages[0].image ||
                      "default_image_url"
                    }
                    alt={product.productname}
                  />
                  <p>{product.productname}</p>
                </Space>
              ),
            }))}
          />
        </div>
      ),
    },
    chooseAccount === "Khách hàng chỉ định" && {
      title: "Chọn tài khoản",
      content: (
        <div>
          <Select
            id="account"
            mode="multiple"
            style={{
              width: "100%",
              padding: "2px",
            }}
            placeholder="Chọn sản phẩm"
            onChange={handleChooseAccount}
            options={accountList.map((account) => ({
              value: account.id,
              label: (
                <Space>
                  <p>{account.username} - </p>
                  <p>Địa chỉ: {account.address}</p>
                  <p>Thành phố: {account.city}</p>
                </Space>
              ),
            }))}
          />
        </div>
      ),
    },
    quantityUse === "Giới hạn số lượng" && {
      title: "Số lượng giới hạn",
      content: (
        <div>
          <Form form={form} layout="vertical" className="space-y-4">
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[
                { required: true, message: "Mã code không được để trống!" },
              ]}
            >
              <Input placeholder="Nhập mã code" />
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ].filter(Boolean);

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

  const onFinish = async () => {
    const image = await uploadImageToFirebase(imageFile);
    form.validateFields().then((values) => {
      const voucher_id = uuidv4();
      setFormData((prevData) => ({ ...prevData, ...values }));

      const allData = formData;
      const formatDate = {
        valid_from: dayjs(
          new Date(
            allData.time[0].$y,
            allData.time[0].$M,
            allData.time[0].$D,
            allData.time[0].$H,
            allData.time[0].$m,
            allData.time[0].$s
          )
        ).format("YYYY-MM-DD HH:mm:ss"),
        valid_to: dayjs(
          new Date(
            allData.time[1].$y,
            allData.time[1].$M,
            allData.time[1].$D,
            allData.time[1].$H,
            allData.time[1].$m,
            allData.time[1].$s
          )
        ).format("YYYY-MM-DD HH:mm:ss"),
      };
      dispatch(
        addVourcherStart({
          id: voucher_id,
          code: allData.code,
          description: allData.description,
          image,
          discount_amount:
            allData.discount_amount && Number(allData.discount_amount),
          discount_percent:
            allData.discount_percent && Number(allData.discount_percent),
          max_discount_amount:
            allData.max_discount_amount && Number(allData.max_discount_amount),
          minimum_order_value:
            allData.minimum_order_value && Number(allData.minimum_order_value),
          valid_from: formatDate.valid_from,
          valid_to: formatDate.valid_to,
          quantity: allData.quantity && Number(allData.quantity),
          is_single_use:
            quantityUse === "Mỗi người tối đa 1 lần" ? true : false,
          status,
        })
      );
      if (selectedAccount.length > 0) {
        selectedAccount.map((slAccount) => {
          dispatch(
            addVoucherAccountStart({
              voucher_id,
              account_id: slAccount,
            })
          );
        });
      }

      if (selectedProduct.length > 0) {
        selectedProduct.map((slProduct) => {
          dispatch(
            addVoucherProductStart({
              voucher_id,
              product_id: slProduct,
            })
          );
        });
      }
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

export default AddVourcher;
