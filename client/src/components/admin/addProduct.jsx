/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { fetchCategories } from "../../reudux/slices/categorySlice";
import { uploadImageToFirebase } from "../../firebase/uploadImage";
import { addProductStart } from "../../reudux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { TiDelete } from "react-icons/ti";
import { getAllColorStart } from "../../reudux/slices/colorSlice";
import { addProductColorStart } from "../../reudux/slices/productColorSlice";
import { addProductImageStart } from "../../reudux/slices/productImageSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const categoryList = Array.isArray(categories.categories)
    ? categories.categories
    : [];

  const { colors } = useSelector((state) => state.colors);
  const colorList = Array.isArray(colors.colors) ? colors.colors : [];

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getAllColorStart());
  }, [dispatch]);

  const [coloridSave, setColoridSave] = useState([]);
  const [images, setImages] = useState([]);

  const handleAddcolor = (colorid) => {
    setColoridSave(colorid);
  };

  console.log(coloridSave);

  const handleSubmit = async (value) => {
    const productid = uuidv4();
    const productColorid = uuidv4();
    try {
      const url = await Promise.all(
        images.map((image) => uploadImageToFirebase(image))
      );
      const { productname, description, price, categoryid, quantity, colorid } =
        value;

      dispatch(
        addProductStart({
          id: productid,
          productname,
          description,
          price,
          categoryid,
        })
      );

      dispatch(
        addProductColorStart({
          id: productColorid,
          quantity,
          sold: 0,
          productid,
          colorid,
        })
      );

      url.forEach((image) => {
        dispatch(
          addProductImageStart({
            image,
            productColorid,
          })
        );
      });

      navigate("/admin/allProduct");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const categoryOptions = useMemo(
    () =>
      categoryList.map((category) => ({
        value: category.id,
        label: category.categoryname,
      })),
    [categoryList]
  );

  const colorOptions = useMemo(
    () =>
      colorList.map((color) => ({
        value: color.id,
        label: color.name,
      })),
    [colorList]
  );

  const imagePreviews = images.map((image, index) => (
    <div key={index} style={{ position: "relative", marginRight: "10px" }}>
      <img
        src={URL.createObjectURL(image)}
        alt={`preview-${index}`}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
        }}
      />
      <TiDelete
        onClick={() => handleRemoveImage(index)}
        style={{
          position: "absolute",
          top: 0,
          right: -15,
          fontSize: "20px",
          cursor: "pointer",
        }}
      />
    </div>
  ));

  return (
    <div style={{ padding: "100px 100px 20px 100px" }}>
      <Card style={{ padding: "20px" }}>
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
              options={categoryOptions}
            />
          </Form.Item>

          <Form.Item
            label="Màu sản phẩm"
            name="colorid"
            rules={[
              {
                required: true,
                message: "Chưa chọn màu sản phẩm!",
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
              options={colorOptions}
              onChange={handleAddcolor}
            />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm" name="image">
            <input type="file" multiple onChange={handleFileChange} />
            <div style={{ display: "flex" }}>{imagePreviews}</div>
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
