import { Button, Checkbox, Input, InputNumber, Modal, Table } from "antd";
import { IoClose } from "react-icons/io5";
import { NumericFormat } from "react-number-format";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteCartStart,
  fetchCartByAccountidStart,
  updateQuantityStart,
} from "../../../reudux/slices/cartSlice";
import { getToken } from "../../../utils/token";
import { addOrderStart } from "../../../reudux/slices/orderSlice";
import { addOrderDetailStart } from "../../../reudux/slices/orderDetailSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { updateProductStart } from "../../../reudux/slices/productSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts } = useSelector((state) => state.carts);
  const token = getToken();

  const cartList = Array.isArray(carts.carts) ? carts.carts : [];

  // eslint-disable-next-line react/prop-types
  const Price = ({ value }) => (
    <NumericFormat
      value={value}
      displayType={"text"}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={0}
    />
  );

  const changeQuantity = (value, id) => {
    dispatch(updateQuantityStart({ id, quantity: value }));
  };

  useEffect(() => {
    dispatch(fetchCartByAccountidStart(token.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token.id]);

  const [totalArr, setTotalArr] = useState([]);
  const [productidArr, setProductidArr] = useState([]);
  const [productnameArr, setProductnameArr] = useState([]);
  const [quantityArr, setQuantityArr] = useState([]);
  const [priceArr, setPriceArr] = useState([]);
  const [imageUrlArr, setImageUrlArr] = useState([]);
  const [productQuantityArr, setProductQuantityArr] = useState([]);
  const [soldArr, setSoldArr] = useState([]);

  const handleChecked = (
    e,
    total,
    productid,
    productname,
    quantity,
    price,
    imageUrl,
    productQuantity,
    sold
  ) => {
    if (e.target.checked) {
      setTotalArr((prev) => [...prev, total]);
      setProductidArr((prev) => [...prev, productid]);
      setProductnameArr((prev) => [...prev, productname]);
      setQuantityArr((prev) => [...prev, quantity]);
      setPriceArr((prev) => [...prev, price]);
      setImageUrlArr((prev) => [...prev, imageUrl]);
      setProductQuantityArr((prev) => [...prev, productQuantity]);
      setSoldArr((prev) => [...prev, sold])
    } else {
      setTotalArr((prev) => prev.filter((item) => item !== total));
      setProductidArr((prev) => prev.filter((item) => item !== productid));
      setProductnameArr((prev) => prev.filter((item) => item !== productname));
      setQuantityArr((prev) => prev.filter((item) => item !== quantity));
      setPriceArr((prev) => prev.filter((item) => item !== price));
      setImageUrlArr((prev) => prev.filter((item) => item !== imageUrl));
      setProductQuantityArr((prev) =>
        prev.filter((item) => item !== productQuantity)
      );
      setSoldArr((prev) => prev.filter((item) => item !== sold))
    }
  };

  const dataSource = cartList.map((cart) => ({
    key: cart.id,
    checkbox:
      cart.Product.quantity === 0 ? (
        <S.OutOfStockText>Hết hàng</S.OutOfStockText>
      ) : (
        <Checkbox
          onChange={(e) =>
            handleChecked(
              e,
              cart.Product.price * cart.quantity,
              cart.Product.id,
              cart.Product.productname,
              cart.quantity,
              cart.Product.price,
              cart.Product.imageUrl,
              cart.Product.quantity,
              cart.Product.sold
            )
          }
        />
      ),
    productName: cart.Product.productname,
    image: <img src={`${cart.Product.imageUrl}`} style={{ width: "50px" }} />,
    price: (
      <S.PriceText>
        <Price value={cart.Product.price} /> đ
      </S.PriceText>
    ),
    quantity: (
      <InputNumber
        min={1}
        max={cart.Product.quantity}
        onChange={(value) => changeQuantity(value, cart.id)}
        defaultValue={cart.quantity}
        disabled={totalArr.includes(cart.Product.price * cart.quantity)}
        onKeyDown={(e) => e.preventDefault()}
      />
    ),
    total: (
      <S.PriceText>
        <Price value={cart.Product.price * cart.quantity} /> đ
      </S.PriceText>
    ),
    delete: (
      <div>
        <IoClose
          onClick={() => {
            if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
              dispatch(deleteCartStart(cart.id));
            }
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    ),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeAdress, setChangerAdress] = useState();
  const [changeCity, setChangeCity] = useState();
  const [address, setAddress] = useState(token.address);
  const [city, setCity] = useState(token.city);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setAddress(changeAdress);
    setCity(changeCity);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    const total = totalArr.reduce((acc, curr) => acc + curr, 0);
    const status = "Đang đóng gói";
    const accountid = token.id;
    const id = uuidv4();
    dispatch(addOrderStart({ id, total, address, city, status, accountid }));
    productidArr.forEach((item, index) => {
      const quantity = quantityArr[index];
      const price = priceArr[index];
      const productid = productidArr[index];
      const imageUrl = imageUrlArr[index];
      const productname = productnameArr[index];
      const productQuantity = productQuantityArr[index];
      const soldProduct = soldArr[index];
      dispatch(
        addOrderDetailStart({
          productname,
          quantity,
          price,
          productid,
          orderid: id,
          imageUrl,
        })
      );
      dispatch(
        updateProductStart({
          id: productid,
          quantity: productQuantity - quantity,
          sold: soldProduct + quantity,
        })
      );
    });
    navigate("/myOrder");
  };

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
      align: "right",
    },
  ];

  const payDataSource = [
    {
      key: "1",
      title: "Tổng phụ",
      value: (
        <S.PriceText>
          <Price value={totalArr.reduce((acc, curr) => acc + curr, 0)} /> đ
        </S.PriceText>
      ),
    },
    {
      key: "2",
      title: "Giao hàng",
      value: (
        <>
          <S.PriceText>Giao hàng miễn phí</S.PriceText>
          <S.PriceText>{address}</S.PriceText>
          <S.PriceText>{city}</S.PriceText>
          <span className="cursor-pointer underline" onClick={showModal}>
            Thay đổi địa chỉ
          </span>
          <Modal
            title="Thay đổi địa chỉ"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input
              onChange={(e) => setChangerAdress(e.target.value)}
              className="mt-2"
              placeholder="Tên đường(Số nhà, thôn, xóm)"
            />
            <Input
              onChange={(e) => setChangeCity(e.target.value)}
              className="mt-2"
              placeholder="Tỉnh/thành phố"
            />
          </Modal>
        </>
      ),
    },
    {
      key: "3",
      title: "Tổng",
      value: (
        <S.PriceText>
          <Price value={totalArr.reduce((acc, curr) => acc + curr, 0)} /> đ
        </S.PriceText>
      ),
    },
  ];

  const payColumns = [
    {
      title: "Tổng số lượng",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "",
      dataIndex: "value",
      key: "value",
      align: "right",
    },
  ];

  return (
    <S.CartWrapper>
      <S.CartArticle>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </S.CartArticle>
      <S.CartAside>
        <Table
          columns={payColumns}
          dataSource={payDataSource}
          pagination={false}
        />
        <Button
          onClick={handleConfirm}
          type="default"
          style={{ width: "100%", marginTop: "15px" }}
        >
          Xác nhận đơn hàng
        </Button>
      </S.CartAside>
    </S.CartWrapper>
  );
};

export default Cart;
