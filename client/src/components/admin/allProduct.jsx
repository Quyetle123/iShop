import { Table } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProductStart,
  fetchProductesStart,
} from "../../reudux/slices/productSlice";

const Allproduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const productList = Array.isArray(products.products) ? products.products : [];
  console.log(productList);

  useEffect(() => {
    dispatch(fetchProductesStart());
  }, [dispatch]);

  // eslint-disable-next-line react/prop-types
  const Price = ({ value }) => (
    <NumericFormat
      value={value}
      displayType={"text"}
      thousandSeparator="."
      decimalSeparator=","
      prefix="₫"
      decimalScale={0}
    />
  );

  const dataSource = productList.map((product, index) => ({
    key: index,
    productId: index + 1,
    productName: product.productname,
    image: <img src={product.imageUrl} style={{ width: "50px" }} />,
    price: <Price value={product.price} />,
    description: product.description,
    quantity: product.quantity,
    sold: product.sold,
    updateAnddelete: (
      <div style={{ display: "flex" }}>
        <Button type="primary">
          <Link to={`/admin/updateProduct/${product.id}`}>Sửa</Link>
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          type="primary"
          danger
          onClick={() => {
            if (window.confirm("Bạn thật sự muốn xóa sản phẩm này?")) {
              dispatch(deleteProductStart(product.id));
            }
          }}
        >
          Xóa
        </Button>
      </div>
    ),
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "productId",
      key: "productId",
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
      title: "Giới thiệu",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Sửa, xóa",
      dataIndex: "updateAnddelete",
      key: "updateAnddelete",
    },
  ];
  return (
    <div style={{ padding: "20px", marginTop: '70px' }}>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default Allproduct;
