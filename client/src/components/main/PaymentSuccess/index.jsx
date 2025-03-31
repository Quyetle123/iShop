import { Card, Button, Typography, Divider } from 'antd';
import { HomeOutlined, ShopOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStoreByIdStart } from '../../../redux/slices/storeSlice';
import { getOrderByIdStart } from '../../../redux/slices/orderSlice';

const { Title, Text } = Typography;

const StoreFoundNotification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const storeid = queryParams.get('si');
    const orderid = queryParams.get('oi');

    const { store } = useSelector((state) => state.stores);
    const { orderById } = useSelector((state) => state.orders);
    console.log(orderById);
    useEffect(() => {
        dispatch(fetchStoreByIdStart(storeid));
        dispatch(getOrderByIdStart(orderid));
    }, [dispatch, storeid, orderid]);

    useEffect(() => {
        if (!storeid) {
            navigate('/');
        }
    }, [storeid]);

    return (
        <div style={{ padding: '100px', backgroundColor: '#f9f9f9', minHeight: '50vh' }}>
            <Card
                style={{
                    maxWidth: 700,
                    margin: 'auto',
                    borderRadius: 12,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Title level={4} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ShopOutlined style={{ color: '#52c41a' }} /> Cửa hàng có hàng gần bạn!
                </Title>

                <Divider />

                <div style={{ marginBottom: 16 }}>
                    <Text strong>Cửa hàng:</Text> {store?.store?.storename} <br />
                    <Text strong>Địa chỉ:</Text> {store?.store?.address}, {store?.store?.Ward?.name},{' '}
                    {store?.store?.District?.name},{store?.store?.Branch?.Province?.name}
                </div>

                <div style={{ marginBottom: 16 }}>
                    <Title level={5}>Thông tin đơn hàng</Title>
                    <Text strong>Người nhận:</Text> {orderById?.order?.username}
                    <br />
                    <Text strong>Tổng đơn:</Text> {orderById?.order?.total.toLocaleString('vi-VN')} đ <br />
                    <Text strong>Phương thức thanh toán:</Text> {orderById?.order?.payMethod} <br />
                    <Text strong>Địa chỉ nhận hàng:</Text> {orderById?.order?.address}, {orderById?.order?.Ward?.name},{' '}
                    {orderById?.order?.District?.name}, {orderById?.order?.Province?.name}
                </div>

                <Divider />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <CheckCircleOutlined style={{ color: '#1890ff' }} />
                    <Text style={{ color: '#1890ff' }}>Đơn hàng của bạn sẽ được giao trong thời gian sớm nhất.</Text>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="default" icon={<HomeOutlined />} onClick={() => navigate('/')}>
                        Về trang chủ
                    </Button>
                    <Button type="primary" icon={<InfoCircleOutlined />} onClick={() => navigate('/order/ORD123456')}>
                        Xem chi tiết đơn
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default StoreFoundNotification;
