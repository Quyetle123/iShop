import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../../utils/token';
import { UserOutlined, LogoutOutlined, ShopOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Layout, Space, Typography, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutStart } from '../../../redux/slices/authSlice';
import { useEffect } from 'react';
import { fetchCompanyAccountStart } from '../../../redux/slices/companyAccountSlice';

const { Header } = Layout;
const { Text } = Typography;

const HeaderTop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { companyAccount } = useSelector((state) => state.companyAccounts);

    console.log(companyAccount?.companyAccount);
    useEffect(() => {
        dispatch(fetchCompanyAccountStart(getToken().id));
    }, [dispatch]);

    const handleLogOut = () => {
        dispatch(logoutStart());
        removeToken();
        navigate('/');
        window.location.reload();
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Text strong>Administrator</Text>
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
                        {companyAccount?.companyAccount?.Company?.companyname}
                    </Text>
                </Space>
                <Space>
                    <EnvironmentOutlined style={{ fontSize: 18, color: '#333' }} />
                    <Text style={{ color: '#555' }}>
                        {companyAccount?.companyAccount?.Company?.address},{' '}
                        {companyAccount?.companyAccount?.Company?.Ward?.name},{' '}
                        {companyAccount?.companyAccount?.Company?.District?.name},{' '}
                        {companyAccount?.companyAccount?.Company?.Province?.name}
                    </Text>
                </Space>
            </Space>

            <Dropdown overlay={menu} placement="bottomRight">
                <Space className="admin-menu">
                    <UserOutlined style={{ fontSize: 18, color: '#333' }} />
                    <Text strong style={{ color: '#333' }}>
                        {companyAccount?.companyAccount?.Account?.username}
                    </Text>
                </Space>
            </Dropdown>
        </Header>
    );
};

export default HeaderTop;
