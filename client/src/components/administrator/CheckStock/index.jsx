import { useEffect, useState } from 'react';
import { Select, Table, Card, Typography, Row, Col, Image, Tag } from 'antd';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBranchStart } from '../../../redux/slices/branchSlice';
import { getStoreByBranchIdStart } from '../../../redux/slices/storeSlice';
import { getStoreStockStart } from '../../../redux/slices/storeStockSlice';
import { checkStoreAiStart } from '../../../redux/slices/aiSlice';

const { Option } = Select;
const { Title } = Typography;

const CheckStock = () => {
    const dispatch = useDispatch();
    const { branches } = useSelector((state) => state.branches);
    const branchList = Array.isArray(branches.branches) ? branches.branches : [];
    useEffect(() => {
        dispatch(fetchAllBranchStart());
    }, [dispatch]);
    const [branch, setBranch] = useState('Chọn chi nhánh');
    const { storeBranch } = useSelector((state) => state.stores);
    const storeBranchList = Array.isArray(storeBranch.store) ? storeBranch.store : [];
    useEffect(() => {
        dispatch(getStoreByBranchIdStart(branch));
    }, [dispatch, branch]);
    const [store, setStore] = useState('Chọn cửa hàng');

    const { storeStocks } = useSelector((state) => state.storeStocks);
    const storeStockList = Array.isArray(storeStocks.storeStocks) ? storeStocks.storeStocks : [];

    useEffect(() => {
        dispatch(getStoreStockStart(store));
    }, [dispatch, store]);
    const [showChat, setShowChat] = useState(false);
    const [showStock, setShowStock] = useState(true);
    const [chatText, setChatText] = useState('');

    const { checkStore } = useSelector((state) => state.ais);

    useEffect(() => {
        dispatch(checkStoreAiStart());
    }, [dispatch]);
    useEffect(() => {
        setChatText(checkStore);
    }, [checkStore]);

    const dataSource = storeStockList.map((item) => ({
        key: item.id,
        id: item.id,
        productname: item.ProductColor?.Product?.productname,
        image: item.ProductColor?.ProductImages?.[0]?.image,
        quantity: item.quantity,
        sold: item.sold,
        productColorId: item.ProductColor?.id,
    }));

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productname',
            key: 'productname',
            ellipsis: true,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} style={{ width: '50px' }} />,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text) => <Tag color={text === 0 ? 'red' : 'green'}>{text}</Tag>,
        },
        {
            title: 'Đã Bán',
            dataIndex: 'sold',
            key: 'sold',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
    ];
    return (
        <div className="p-5 w-full mx-auto">
            {showChat && (
                <Card className="mb-6 shadow-xl rounded-2xl w-full mx-auto">
                    <Row gutter={16} align="middle">
                        <Col xs={24} md={6} className="relative">
                            <Image
                                src="https://lh7-us.googleusercontent.com/docsz/AD_4nXfbYNmc3GQ9UQTyn6cVkpNI0_H5CWxWciFENNkO642Jdudn444S_C3QgAgVsEBViT2KSJWeA5muHxJ3gq1-GC7t3vrKgHIz33V9vaXvIYBGI-BzwgHN_y4JKVDcstSYKHPQLEjUO5p7g9eWzZsMQohQAaqG?key=K02u-V0y5YTGLvwjLYJA9A"
                                alt="AI Talking"
                                preview={false}
                                width={250}
                                className="rounded-full"
                            />
                        </Col>
                        <Col xs={24} md={18}>
                            <div className="relative bg-[#f0f0f0] p-6 rounded-xl shadow-xl">
                                <div className="absolute top-[0px] left-[-20px] w-0 h-0 border-[20px] border-l-transparent border-r-transparent border-b-[20px] border-b-[#f0f0f0] z-20"></div>
                                <div className="p-4 text-lg leading-relaxed bg-white rounded-xl shadow-xl max-w-[85%] ml-6">
                                    <div className="bubbles">
                                        <p className="text-gray-700">{chatText}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div
                        className="absolute top-4 right-4 text-blue-600 cursor-pointer"
                        onClick={() => {
                            setShowChat(false);
                            setShowStock(true);
                        }}
                    >
                        <IoClose className="text-[25px]" />
                    </div>
                </Card>
            )}

            {!showChat && (
                <div
                    className="fixed bottom-0 right-0 m-5 p-4 bg-blue-500 text-white rounded-full cursor-pointer"
                    style={{ zIndex: 999 }}
                    onClick={() => {
                        setShowChat(true);
                        setShowStock(false);
                    }}
                >
                    <div className="text-xl">💬 AI tư vấn</div>
                </div>
            )}

            {showStock && (
                <Card className="shadow-xl rounded-2xl">
                    <Title level={4}>🔍 Tra cứu kho</Title>
                    <Row gutter={16} className="mb-4">
                        <Col xs={24} md={6}>
                            <label>Chi nhánh:</label>
                            <Select style={{ width: '100%' }} value={branch} onChange={(value) => setBranch(value)}>
                                {branchList.map((branch) => (
                                    <Option key={branch.id} value={branch.id}>
                                        {branch.Province.name}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} md={6}>
                            <label>Cửa hàng:</label>
                            <Select style={{ width: '100%' }} value={store} onChange={(value) => setStore(value)}>
                                {storeBranchList.map((store) => (
                                    <Option key={store.id} value={store.id}>
                                        {store.storename}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </Card>
            )}
        </div>
    );
};

export default CheckStock;
