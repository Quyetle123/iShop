import { Button, Checkbox, InputNumber, Table } from "antd";
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

const Cart = () => {
  const dispatch = useDispatch();
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

  const handleChecked = (e, total) => {
    if (e.target.checked) {
      setTotalArr((prev) => [...prev, total]);
    } else {
      setTotalArr((prev) => prev.filter((item) => item !== total));
    }
  };

  console.log(totalArr);

  const dataSource = cartList.map((cart) => ({
    key: cart.id,
    checkbox: (
      <Checkbox
        onChange={(e) => handleChecked(e, cart.Product.price * cart.quantity)}
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
        max={10}
        onChange={(value) => changeQuantity(value, cart.id)}
        defaultValue={cart.quantity}
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
        <IoClose onClick={() => {
          if(window.confirm("Bạn muốn xóa sản phẩm này?")) {
            dispatch(deleteCartStart(cart.id))
          }
        }} style={{ cursor: "pointer" }} />
      </div>
    ),
  }));

  const columns = [
    {
      title: "STT",
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
          <S.PriceText>{token.address}</S.PriceText>
          <S.PriceText>{token.city}</S.PriceText>
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
        <Button type="default" style={{ width: "100%", marginTop: "15px" }}>
          Thanh toán
        </Button>
      </S.CartAside>
    </S.CartWrapper>
  );
};

export default Cart;
