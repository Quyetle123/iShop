import { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdStart,
  updateProductStart,
} from "../../reudux/slices/productSlice";
import { fetchCategories } from "../../reudux/slices/categorySlice";
import { uploadImageToFirebase } from "../../firebase/uploadImage";
import TextArea from "antd/es/input/TextArea";

const UpdateProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [formUpdate] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { selectedProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductByIdStart(id));
  }, [dispatch, id]);

  const { categories } = useSelector((state) => state.categories);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categoryList = Array.isArray(categories.categories)
    ? categories.categories
    : [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      formUpdate.setFieldsValue({
        productname: selectedProduct.product.productname,
        description: selectedProduct.product.description,
        price: selectedProduct.product.price,
        categoryid: selectedProduct.product.categoryid,
        quantity: selectedProduct.product.quantity,
      });
    }
  }, [selectedProduct, formUpdate]);

  const handleSubmit = async (value) => {
    const { productname, description, price, categoryid, quantity } = value;
    const sold = 0;

    try {
      if (image) {
        const url = await uploadImageToFirebase(image);
        dispatch(
          updateProductStart({
            id,
            productname,
            description,
            price,
            categoryid,
            quantity,
            sold,
            imageUrl: url,
          })
        );
      } else {
        dispatch(
          updateProductStart({
            id,
            productname,
            description,
            price,
            categoryid,
            quantity,
            sold,
          })
        );
      }
      navigate("/admin/allProduct");
    } catch (error) {
      console.error("Error updating product:", error);
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
    <div style={{ width: "100%", marginTop: '100px' }}>
      <Form
        onFinish={handleSubmit}
        form={formUpdate}
        layout="vertical"
        name="basic"
        style={{
          margin: "20px 150px",
        }}
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
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={options}
          />
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm hiện tại">
          <img
            className="w-[100px]"
            src={selectedProduct && selectedProduct.product.imageUrl}
            alt="current product"
          />
        </Form.Item>

        <Form.Item label="Cập nhật ảnh mới" name="image">
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
    </div>
  );
};

export default UpdateProduct;
