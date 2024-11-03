/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../reudux/slices/categorySlice";
import { uploadImageToFirebase } from "../../firebase/uploadImage";
import { addProductStart } from "../../reudux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const categoryList = Array.isArray(categories.categories)
    ? categories.categories
    : [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const [image, setImage] = useState(null);

  const handleSubmit = async (value) => {
    try {
      const url = await uploadImageToFirebase(image);
      const { productname, description, price, categoryid, quantity } = value;

      await dispatch(
        addProductStart({
          productname,
          description,
          price,
          categoryid,
          quantity,
          sold: 0,
          imageUrl: url,
        })
      );

      navigate("/admin/allProduct");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const options = useMemo(
    () =>
      categoryList.map((category) => ({
        value: category.id,
        label: category.categoryname,
      })),
    [categoryList]
  );

  return (
    <div style={{ padding: "100px 100px 20px 100px"}}>
      <Card style={{padding: '20px'}}>
        <Form
          onFinish={(value) => handleSubmit(value)}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="productname"
            rules={[
              {
                required: true,
                message: "Chưa điền tên sản phẩm!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới thiệu"
            name="description"
            rules={[
              {
                required: true,
                message: "Chưa điền giới thiệu!",
              },
            ]}
          >
            <TextArea showCount maxLength={500} placeholder="can resize" />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: "Chưa điền giá!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="categoryid"
            rules={[
              {
                required: true,
                message: "Chưa chọn danh mục!",
              },
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={options}
            />
          </Form.Item>

          <Form.Item
            label="Ảnh sản phẩm"
            name="image"
            rules={[
              {
                required: true,
                message: "Chưa chọn ảnh!",
              },
            ]}
          >
            <input type="file" onChange={handleFileChange} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Chưa điền số lượng!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;
