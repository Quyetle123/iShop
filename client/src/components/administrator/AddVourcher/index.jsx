import { Button, Card, Form, Input, message, Select, Spin, Steps, Switch, Upload } from 'antd';
import * as S from './style';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { uploadImageToFirebase } from '../../../firebase/uploadImage';
import { useDispatch, useSelector } from 'react-redux';
import { addVourcherStart } from '../../../redux/slices/vourcherSlice';
import { fetchProductesStart } from '../../../redux/slices/productSlice';
import { fetchAccountsStart } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker;

const AddVourcher = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [status, setStatus] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(null);
    const [discountPercent, setDiscountPercent] = useState(null);
    const onChange = (checked) => {
        setStatus(checked);
    };

    const handleDiscountAmountChange = (e) => {
        setDiscountAmount(e.target.value);
        if (e.target.value) {
            form.setFieldsValue({ discount_percent: '' });
            setDiscountPercent(null);
        }
    };

    const handleDiscountPercentChange = (e) => {
        setDiscountPercent(e.target.value);
        if (e.target.value) {
            form.setFieldsValue({ discount_amount: '' });
            setDiscountAmount(null);
        }
    };

    const [chooseProduct, setChooseProduct] = useState('Tất cả');
    const [chooseAccount, setChooseAccount] = useState('Tất cả');
    const [quantityUse, setQuantityUse] = useState('Không giới hạn số lượng');

    const handleImageUpload = ({ file }) => {
        if (file.type.startsWith('image/')) {
            setImageFile(file);
            message.success(`Tải ảnh ${file.name} thành công!`);
        } else {
            message.error('Chỉ được phép tải ảnh!');
        }
    };

    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');

    console.log(selectedProduct);
    console.log(selectedAccount);

    const handleChooseProduct = (value) => {
        setSelectedProduct(value);
    };

    const handleChooseAccount = (value) => {
        setSelectedAccount(value);
    };

    const steps = [
        {
            title: 'Loại voucher',
            content: (
                <div>
                    <Form layout="vertical">
                        <Form.Item label="Áp dụng cho sản phẩm:">
                            <Select
                                defaultValue={chooseProduct}
                                onChange={(value) => setChooseProduct(value)}
                                options={[
                                    { value: 'Tất cả', label: 'Tất cả' },
                                    { value: 'Sản phẩm chỉ định', label: 'Sản phẩm chỉ định' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label="Áp dụng cho tài khoản:">
                            <Select
                                defaultValue={chooseAccount}
                                onChange={(value) => setChooseAccount(value)}
                                options={[
                                    { value: 'Tất cả', label: 'Tất cả' },
                                    {
                                        value: 'Khách hàng chỉ định',
                                        label: 'Khách hàng chỉ định',
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
                                        value: 'Không giới hạn số lượng',
                                        label: 'Không giới hạn số lượng',
                                    },
                                    {
                                        value: 'Giới hạn số lượng',
                                        label: 'Giới hạn số lượng',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            title: 'Tạo voucher',
            content: (
                <Form form={form} layout="vertical" className="space-y-4">
                    <Form.Item
                        label="Mã code"
                        name="code"
                        rules={[{ required: true, message: 'Mã code không được để trống!' }]}
                    >
                        <Input placeholder="Nhập mã code" />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa điền mô tả!',
                            },
                        ]}
                    >
                        <TextArea showCount maxLength={500} placeholder="can resize" />
                    </Form.Item>

                    <Form.Item
                        label="Số tiền giảm giá"
                        name="discount_amount"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập số tiền giảm giá"
                            onChange={handleDiscountAmountChange}
                            disabled={!!discountPercent}
                        />
                    </Form.Item>

                    <Form.Item label="Phần trăm giảm giá" name="discount_percent" rules={[{ required: false }]}>
                        <Input
                            placeholder="Nhập phần trăm giảm giá"
                            onChange={handleDiscountPercentChange}
                            disabled={!!discountAmount}
                        />
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
                        rules={[{ required: true, message: 'Thời gian không được để trống!' }]}
                    >
                        <RangePicker showTime />
                    </Form.Item>

                    <Form.Item label="Ảnh chính">
                        <Upload beforeUpload={() => false} maxCount={1} onChange={handleImageUpload} accept="image/*">
                            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Trạng thái: ">
                        <Switch defaultChecked onChange={onChange} />
                    </Form.Item>
                </Form>
            ),
        },
        chooseProduct === 'Sản phẩm chỉ định' && {
            title: 'Chọn sản phẩm',
            content: (
                <div>
                    <Select
                        id="product"
                        style={{
                            width: '100%',
                            padding: '2px',
                        }}
                        placeholder="Chọn sản phẩm"
                        onChange={handleChooseProduct}
                        options={productList.map((product) => ({
                            value: product.id,
                            label: product.productname,
                        }))}
                    />
                </div>
            ),
        },
        chooseAccount === 'Khách hàng chỉ định' && {
            title: 'Chọn tài khoản',
            content: (
                <div>
                    <Select
                        id="account"
                        style={{
                            width: '100%',
                            padding: '2px',
                        }}
                        placeholder="Chọn tài khoản"
                        onChange={handleChooseAccount}
                        options={accountList.map((account) => ({
                            value: account.id,
                            label: `${account.username} - Địa chỉ: ${account.address} - Thành phố: ${account.city}`,
                        }))}
                    />
                </div>
            ),
        },

        quantityUse === 'Giới hạn số lượng' && {
            title: 'Số lượng giới hạn',
            content: (
                <div>
                    <Form form={form} layout="vertical" className="space-y-4">
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[{ required: true, message: 'Mã code không được để trống!' }]}
                        >
                            <Input placeholder="Nhập mã code" />
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
    ].filter(Boolean);

    const next = () => {
        form.validateFields()
            .then((values) => {
                setFormData((prevData) => ({ ...prevData, ...values }));
                setCurrent(current + 1);
            })
            .catch(() => {
                message.error('Vui lòng hoàn thành tất cả các trường bắt buộc.');
            });
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            const voucher_id = uuidv4();
            const allData = { ...formData, ...values };

            setLoading(true);

            const image = await uploadImageToFirebase(imageFile);

            const formatDate = {
                valid_from: dayjs(allData.time[0].toDate()).format('YYYY-MM-DD HH:mm:ss'),
                valid_to: dayjs(allData.time[1].toDate()).format('YYYY-MM-DD HH:mm:ss'),
            };

            dispatch(
                addVourcherStart({
                    voucher_id,
                    code: allData.code,
                    description: allData.description,
                    image,
                    discount_amount: allData.discount_amount ? Number(allData.discount_amount) : null,
                    discount_percent: allData.discount_percent ? Number(allData.discount_percent) : null,
                    max_discount_amount: allData.max_discount_amount ? Number(allData.max_discount_amount) : null,
                    minimum_order_value: allData.minimum_order_value ? Number(allData.minimum_order_value) : null,
                    valid_from: formatDate.valid_from,
                    valid_to: formatDate.valid_to,
                    quantity: allData.quantity && Number(allData.quantity),
                    is_single_use: quantityUse === 'Không giới hạn số lượng' ? true : false,
                    status,
                    selectedAccount,
                    selectedProduct,
                }),
            );

            message.success('Đã tạo voucher thành công!');
        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
            navigate('/administrator/all-vourchers');
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
                <div className="steps-action" style={{ marginTop: '20px' }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Tiếp theo
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={onFinish} disabled={loading}>
                            {loading ? <Spin size="small" /> : 'Hoàn thành'}
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            Quay lại
                        </Button>
                    )}
                </div>
            </Card>
        </S.Container>
    );
};

export default AddVourcher;
