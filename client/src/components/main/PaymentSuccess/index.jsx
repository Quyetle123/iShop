import { Card, Button, Result } from 'antd';
import { SmileOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Card
                style={{
                    textAlign: 'center',
                    width: 450,
                    borderRadius: 15,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Result
                    icon={<SmileOutlined style={{ color: '#52c41a', fontSize: 48 }} />}
                    status="success"
                    title="Thanh toán thành công!"
                    subTitle="Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý và sẽ sớm giao đến tay bạn."
                    extra={[
                        <Button key="home" type="primary" icon={<HomeOutlined />} onClick={() => navigate('/')}>
                            Về trang chủ
                        </Button>,
                        <Button
                            key="shop"
                            type="default"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => navigate('/cart')}
                        >
                            Tiếp tục mua sắm
                        </Button>,
                    ]}
                />
            </Card>
        </div>
    );
};

export default PaymentSuccess;
