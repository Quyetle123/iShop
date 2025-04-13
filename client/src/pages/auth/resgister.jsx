import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button, Typography, message, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, sendmailStart } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProvincesStart } from '../../redux/slices/provinceSlice';
import { fetchDistrictByProvinceIdStart } from '../../redux/slices/districtSlice';
import { fetchWardsByDistrictIdStart } from '../../redux/slices/wardSlice';

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { provinces } = useSelector((state) => state.provinces);
    const { districts } = useSelector((state) => state.districts);
    const { wards } = useSelector((state) => state.wards);
    const provinceList = Array.isArray(provinces.province) ? provinces.province : [];
    const districtList = Array.isArray(districts.district) ? districts.district : [];
    const wardList = Array.isArray(wards.wards) ? wards.wards : [];

    useEffect(() => {
        dispatch(fetchProvincesStart());
    }, [dispatch]);

    const handleProvinceChange = (provinceCode) => {
        dispatch(fetchDistrictByProvinceIdStart(provinceCode));
        form.setFieldsValue({ district: undefined, ward: undefined });
    };

    const handleDistrictChange = (districtCode) => {
        dispatch(fetchWardsByDistrictIdStart(districtCode));
        form.setFieldsValue({ ward: undefined });
    };

    const { isLoading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otpEnabled, setOtpEnabled] = useState(false);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleSendOtp = () => {
        const email = form.getFieldValue('email');
        if (!email) {
            message.warning('Vui lòng nhập email trước khi gửi OTP!');
            return;
        }
        dispatch(sendmailStart({ email }));
        message.success('Gửi mã xác thực thành công!');
        setOtpEnabled(true);
    };

    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() => {
        if (isSubmitted && error) {
            message.error(error);
            setIsSubmitted(false);
        }
    }, [error, isSubmitted]);

    useEffect(() => {
        if (isSubmitted && !isLoading && !error) {
            message.success('Đăng ký thành công!');
            navigate('/login');
        }
    }, [isLoading, error, isSubmitted, navigate]);

    const handleSubmit = (values) => {
        try {
            setIsSubmitted(false);
            const checkOtp = otp.join('');
            console.log(checkOtp);
            const { username, phoneNumber, password, email, city, district, ward, address } = values;
            const id = uuidv4();

            dispatch(
                registerStart({
                    id,
                    username,
                    phoneNumber,
                    password,
                    email,
                    role: 'user',
                    otp: checkOtp,
                    province_id: city,
                    district_id: district,
                    wards_id: ward,
                    address,
                }),
            );
        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setIsSubmitted(true);
        }
    };

    const onFinishFailed = () => {
        message.error('Vui lòng điền đầy đủ thông tin!');
    };
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #1e1e2f, #2a2a47)',
                padding: '20px',
            }}
        >
            <div
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    background: '#fff',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Title level={3} style={{ textAlign: 'center', color: '#2a2a47' }}>
                    Đăng ký tài khoản
                </Title>
                <Form form={form} layout="vertical" onFinish={handleSubmit} onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="Họ và tên"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                        <Input placeholder="Họ và tên" />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
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
                        <Input.Password placeholder="Nhập lại mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Thành phố"
                        name="city"
                        rules={[{ required: true, message: 'Vui lòng chọn thành phố!' }]}
                    >
                        <Select placeholder="Chọn thành phố" onChange={handleProvinceChange}>
                            {provinceList?.map((province) => (
                                <Option key={province.province_id} value={province.province_id}>
                                    {province.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Quận/Huyện"
                        name="district"
                        rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                    >
                        <Select placeholder="Chọn quận/huyện" onChange={handleDistrictChange}>
                            {districtList?.map((district) => (
                                <Option key={district.district_id} value={district.district_id}>
                                    {district.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Phường/Xã"
                        name="ward"
                        rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                    >
                        <Select placeholder="Chọn phường/xã">
                            {wardList?.map((ward) => (
                                <Option key={ward.wards_id} value={ward.wards_id}>
                                    {ward.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input placeholder="Địa chỉ" />
                    </Form.Item>
                    <Form.Item label="Xác thực email">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                className="w-8 h-8 ml-2 text-center border border-gray-300 rounded-md"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                disabled={!otpEnabled}
                                style={{
                                    backgroundColor: otpEnabled ? 'white' : '#f5f5f5',
                                    cursor: otpEnabled ? 'text' : 'not-allowed',
                                }}
                            />
                        ))}
                        <Button
                            onClick={handleSendOtp}
                            className="ml-4"
                            loading={isLoading}
                            style={{ backgroundColor: '#2a2a47', color: 'white' }}
                        >
                            {isLoading ? 'Đang gửi...' : otpEnabled ? 'Gửi lại' : 'Gửi OTP'}
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ backgroundColor: '#2a2a47', borderColor: '#2a2a47' }}
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
                <Text style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                    Đã có tài khoản?{' '}
                    <a href="/login" style={{ color: '#2a2a47' }}>
                        Đăng nhập ngay
                    </a>
                </Text>
            </div>
        </div>
    );
};

export default Register;
