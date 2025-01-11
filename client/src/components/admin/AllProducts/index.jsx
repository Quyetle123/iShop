/* eslint-disable react/prop-types */
import { Table, Image } from "antd";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProductStart,
  fetchProductesStart,
} from "../../../redux/slices/productSlice";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const productList = Array.isArray(products.products) ? products.products : [];

  useEffect(() => {
    dispatch(fetchProductesStart());
  }, [dispatch]);

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
    key: product.id,
    productId: index + 1,
    productName: product.productname,
    price: <Price value={product.price} />,
    description: product.description,
    updateAndDelete: (
      <div style={{ display: "flex" }}>
        <Link to={`/admin/updateProduct/${product.id}`}>
          <FaEdit className="text-[20px] cursor-pointer" />
        </Link>
        <MdDeleteOutline
          className="ml-[10px] text-[20px] cursor-pointer hover:text-red-400"
          onClick={() => {
            if (window.confirm("Bạn thật sự muốn xóa sản phẩm này?")) {
              dispatch(deleteProductStart(product.id));
            }
          }}
        />
      </div>
    ),
    ProductColors: product.ProductColors,
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
      title: "Sửa, xóa",
      dataIndex: "updateAndDelete",
      key: "updateAndDelete",
    },
  ];

  const expandedRowRender = (record) => {
    const colorData = record.ProductColors.map((color) => ({
      key: color.id,
      colorName: color.Color.name,
      firstImage:
        color.ProductImages?.[0]?.image || "No Image Available",
      quantity: color.quantity,
      sold: color.sold,
    }));
    
    const colorColumns = [
      {
        title: "Màu sắc",
        dataIndex: "colorName",
        key: "colorName",
      },
      {
        title: "Ảnh",
        dataIndex: "firstImage",
        key: "firstImage",
        render: (text) =>
          text !== "No Image Available" ? (
            <Image width={50} src={text} alt="Product Color Image" />
          ) : (
            text
          ),
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
    ];

    return (
      <Table
        columns={colorColumns}
        dataSource={colorData}
        pagination={false}
        rowKey="colorId"
      />
    );
  };

  return (
    <div style={{ padding: "20px", marginTop: '70px' }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.ProductColors.length > 0,
        }}
      />
    </div>
  );
};

export default AllProduct;
