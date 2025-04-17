import { v4 as uuidv4 } from 'uuid';
import {
    Form,
    Input,
    Button,
    Typography,
    Select,
    Steps,
    message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, sendmailStart } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProvincesStart } from '../../redux/slices/provinceSlice';
import { fetchDistrictByProvinceIdStart } from '../../redux/slices/districtSlice';
import { fetchWardsByDistrictIdStart } from '../../redux/slices/wardSlice';

const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const Register = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { provinces } = useSelector((state) => state.provinces);
    const { districts } = useSelector((state) => state.districts);
    const { wards } = useSelector((state) => state.wards);
    const { isLoading, error } = useSelector((state) => state.auth);

    const provinceList = provinces?.province || [];
    const districtList = districts?.district || [];
    const wardList = wards?.wards || [];

    const [currentStep, setCurrentStep] = useState(0);
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [formValues, setFormValues] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isNext, setIsNext] = useState(false);

    useEffect(() => {
        dispatch(fetchProvincesStart());
    }, [dispatch]);

    useEffect(() => {
        if (isSubmitted && error) {
            message.error(error);
            setIsSubmitted(false);
        }
        if (isSubmitted && !isLoading && !error) {
            message.success('Đăng ký thành công!');
            navigate('/login');
        }
    }, [isLoading, error, isSubmitted, navigate]);

    const handleProvinceChange = (provinceCode) => {
        dispatch(fetchDistrictByProvinceIdStart(provinceCode));
        form.setFieldsValue({ district: undefined, ward: undefined });
    };

    const handleDistrictChange = (districtCode) => {
        dispatch(fetchWardsByDistrictIdStart(districtCode));
        form.setFieldsValue({ ward: undefined });
    };

    

    const handleNext = async () => {
        try {
            const values = await form.validateFields();
            setFormValues(values);
            dispatch(sendmailStart({ email: values.email }));
            setIsNext(true);
        } catch (err) {
            console.error('Validation failed:', err);
        }
    };

    useEffect(() => {
        if (isNext && error) {
            message.error(error);
            setIsNext(false);
        }
    
        if (isNext && !isLoading && !error) {
            message.success('Mã OTP đã được gửi tới email!');
            setCurrentStep(1);
            setIsNext(false);
        }
    }, [isLoading, error, isNext]);
    
    

    const handleOtpChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleSubmit = () => {
        const otpCode = otp.join('');
        if (otpCode.length < 6) {
            message.warning('Vui lòng nhập đầy đủ mã OTP!');
            return;
        }

        const id = uuidv4();
        dispatch(
            registerStart({
                ...formValues,
                id,
                role: 'user',
                otp: otpCode,
                province_id: formValues.city,
                district_id: formValues.district,
                wards_id: formValues.ward,
            }),
        );
        setIsSubmitted(true);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', background: 'linear-gradient(135deg, #1e1e2f, #2a2a47)' }}>
            <div style={{ maxWidth: 600, width: '100%', background: '#fff', padding: 40, borderRadius: 10 }}>
                <Title level={3} style={{ textAlign: 'center', color: '#2a2a47' }}>Đăng ký tài khoản</Title>
                <Steps current={currentStep} style={{ marginBottom: 30 }}>
                    <Step title="Thông tin" />
                    <Step title="Xác thực OTP" />
                </Steps>

                {currentStep === 0 && (
                    <Form form={form} layout="vertical">
                        <Form.Item name="username" label="Họ và tên" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Nhập lại mật khẩu"
                            dependencies={['password']}
                            rules={[
                                { required: true },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="city" label="Thành phố" rules={[{ required: true }]}>
                            <Select onChange={handleProvinceChange}>
                                {provinceList.map((province) => (
                                    <Option key={province.province_id} value={province.province_id}>
                                        {province.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="district" label="Quận/Huyện" rules={[{ required: true }]}>
                            <Select onChange={handleDistrictChange}>
                                {districtList.map((district) => (
                                    <Option key={district.district_id} value={district.district_id}>
                                        {district.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="ward" label="Phường/Xã" rules={[{ required: true }]}>
                            <Select>
                                {wardList.map((ward) => (
                                    <Option key={ward.wards_id} value={ward.wards_id}>
                                        {ward.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Button type="primary" onClick={handleNext} block>
                            Tiếp tục
                        </Button>
                    </Form>
                )}

                {currentStep === 1 && (
                    <>
                        <Text>Nhập mã OTP đã gửi đến email của bạn:</Text>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    style={{ width: 40, height: 40, textAlign: 'center', marginRight: 8 }}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                />
                            ))}
                        </div>
                        <Button type="primary" onClick={handleSubmit} loading={isLoading} block>
                            Xác nhận đăng ký
                        </Button>
                        <Button type="link" onClick={() => setCurrentStep(0)} style={{ marginTop: 12 }}>
                            Quay lại
                        </Button>
                    </>
                )}

                <Text style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                    Đã có tài khoản? <a href="/login" style={{ color: '#2a2a47' }}>Đăng nhập ngay</a>
                </Text>
            </div>
        </div>
    );
};

export default Register;
