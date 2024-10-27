import { Button, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategoryStart, fetchCategories } from "../../reudux/slices/categorySlice";

const AllCategories = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const categoryList = Array.isArray(categories.categories) ? categories.categories : [];


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const dataSource = categoryList.map((category, index) => ({
    key: category.id,
    id: index + 1,
    categoryName: category.categoryname,
    image: <img src={category.imageUrl} style={{ width: "50px" }} />,
    description: category.description,
    updateAnddelete: (
      <div className="flex">
        <Button type="primary">
          <Link to={`/admin/updateCategory/${category.id}`}>Sửa</Link>
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          type="primary"
          danger
          onClick={() => {
            if (window.confirm("Bạn thật sự muốn xóa danh mục này ?")) {
              dispatch(deleteCategoryStart(category.id))
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
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image"
    },
    {
      title: "Giới thiệu",
      dataIndex: "description",
      key: "description",
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

export default AllCategories;
