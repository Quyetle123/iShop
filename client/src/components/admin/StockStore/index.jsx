import {
  Button,
  Card,
  Checkbox,
  InputNumber,
  message,
  Modal,
  Table,
  Tag,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getStoreStockStart,
  initializeStoreStockStart,
  updateQuantityStoreStockStart,
} from "../../../redux/slices/storeStockSlice";
import { getToken } from "../../../utils/token";
import { getAccountStorebyAccountIdStart } from "../../../redux/slices/storeAccountSlice";
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { updateStatusStoreStart } from "../../../redux/slices/storeSlice";
import { addInventoryHistoryStart } from "../../../redux/slices/inventoryHistorySlice";

const { Title, Text } = Typography;
const StockStore = () => {
  const dispatch = useDispatch();
  const { storeAccount } = useSelector((state) => state.storeAccounts);

  useEffect(() => {
    dispatch(getAccountStorebyAccountIdStart(getToken().id));
  }, [dispatch]);

  const { storeStocks } = useSelector((state) => state.storeStocks);
  const storeStockList = Array.isArray(storeStocks.storeStocks)
    ? storeStocks.storeStocks
    : [];
  useEffect(() => {
    dispatch(getStoreStockStart(storeAccount?.accountStore?.Store?.id));
  }, [dispatch, storeAccount]);

  const handleInitializeStock = () => {
    dispatch(
      initializeStoreStockStart({
        storeid: storeAccount?.accountStore?.Store?.id,
      })
    );
    dispatch(
      updateStatusStoreStart({
        id: storeAccount?.accountStore?.Store?.id,
        status: "Hoạt động",
      })
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [importQuantity, setImportQuantity] = useState(0);

  const openImportModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeImportModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    setIsConfirmed(false);
    setImportQuantity(0);
  };

  const handleImportStock = () => {
    if (!importQuantity || importQuantity <= 0) {
      message.error("Vui lòng nhập số lượng hợp lệ!");
      return;
    }

    if (!isConfirmed) {
      message.warning("Vui lòng xác nhận trước khi nhập kho!");
      return;
    }
    if (isConfirmed) {
      dispatch(
        updateQuantityStoreStockStart({
          storeid: storeAccount?.accountStore?.Store?.id,
          productColorid: selectedProduct.productColorId,
          quantity: importQuantity,
        })
      );
      dispatch(
        addInventoryHistoryStart({
          productColorid: selectedProduct.productColorId,
          quantity: importQuantity,
          type: "Import",
          storeid: storeAccount?.accountStore?.Store?.id,
        })
      );
      setImportQuantity(0);
      setSelectedProduct(null);
      setIsConfirmed(false);
      setIsModalOpen(false);
    }
  };

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
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productname",
      key: "productname",
      ellipsis: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} style={{ width: "50px" }} />,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <Tag color={text === 0 ? "red" : "green"}>{text}</Tag>,
    },
    {
      title: "Đã Bán",
      dataIndex: "sold",
      key: "sold",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Nhập kho",
      key: "import",
      render: (_, record) => (
        <Button type="primary" onClick={() => openImportModal(record)}>
          Nhập kho
        </Button>
      ),
    },
  ];
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Modal
        title="Nhập kho"
        open={isModalOpen}
        onCancel={closeImportModal}
        onOk={handleImportStock}
      >
        <p>Sản phẩm: {selectedProduct?.productname}</p>
        <InputNumber
          min={1}
          value={importQuantity}
          onChange={setImportQuantity}
          placeholder="Nhập số lượng"
        />
        <Checkbox
          checked={isConfirmed}
          onChange={(e) => setIsConfirmed(e.target.checked)}
        >
          Tôi xác nhận số lượng nhập vào là chính xác và chịu trách nhiệm nếu có
          sai sót.
        </Checkbox>
      </Modal>

      {storeAccount?.accountStore?.Store?.status !== "Hoạt động" ? (
        <Card className="shadow-lg p-6 w-96 text-center">
          {storeAccount?.accountStore?.Store?.status === "Cần khởi tạo" && (
            <>
              <ExclamationCircleOutlined className="text-red-500 text-4xl mb-2" />
              <Title level={4}>Kho hàng chưa được khởi tạo</Title>
              <Text>Bấm nút dưới đây để khởi tạo kho hàng.</Text>
              <Button
                type="primary"
                block
                className="mt-4"
                onClick={handleInitializeStock}
              >
                Khởi tạo kho
              </Button>
            </>
          )}

          {storeAccount?.accountStore?.Store?.status === "Cần cập nhật" && (
            <>
              <ExclamationCircleOutlined className="text-orange-500 text-4xl mb-2" />
              <Title level={4}>Cập nhật sản phẩm mới</Title>
              <Text>
                Có sản phẩm mới từ công ty. Vui lòng cập nhật để tiếp tục.
              </Text>
              <Button type="primary" block className="mt-4">
                Cập nhật sản phẩm
              </Button>
            </>
          )}
        </Card>
      ) : (
        <div className="shadow-lg p-6 bg-white rounded-lg w-[90%] max-w-6xl">
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            bordered
          />
        </div>
      )}
    </div>
  );
};

export default StockStore;
