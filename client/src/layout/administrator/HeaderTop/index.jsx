import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../../utils/token';
import { UserOutlined, LogoutOutlined, ShopOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Layout, Space, Typography, Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutStart } from '../../../redux/slices/authSlice';

const { Header } = Layout;
const { Text } = Typography;

const HeaderTop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logoutStart());
        removeToken();
        navigate('/');
        window.location.reload();
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Text strong>Admin</Text>
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogOut} danger>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="header-top bg-white flex justify-between">
            <Space size="large">
                <Space>
                    <ShopOutlined style={{ fontSize: 18, color: '#333' }} />
                    <Text strong style={{ color: '#333' }}>
                        Apple Store Việt Nam
                    </Text>
                </Space>
                <Space>
                    <EnvironmentOutlined style={{ fontSize: 18, color: '#333' }} />
                    <Text style={{ color: '#555' }}>123 Đường ABC, P.1, Q.1, TP. HCM</Text>
                </Space>
            </Space>

            <Dropdown overlay={menu} placement="bottomRight">
                <Space className="admin-menu">
                    <UserOutlined style={{ fontSize: 18, color: '#333' }} />
                    <Text strong style={{ color: '#333' }}>
                        Admin
                    </Text>
                </Space>
            </Dropdown>
        </Header>
    );
};

export default HeaderTop;
