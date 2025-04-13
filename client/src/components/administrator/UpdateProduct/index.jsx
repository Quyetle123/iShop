/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Form, Input, Modal, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdStart,
  updateProductStart,
} from "../../../redux/slices/productSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { uploadImageToFirebase } from "../../../firebase/uploadImage";
import TextArea from "antd/es/input/TextArea";
import { TiDelete } from "react-icons/ti";
import { getAllColorStart } from "../../../redux/slices/colorSlice";
import { addProductColorStart } from "../../../redux/slices/productColorSlice";
import { v4 as uuidv4 } from "uuid";

const UpdateProduct = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formUpdate] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addForm] = Form.useForm();

  const { selectedProduct } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const { colors } = useSelector((state) => state.colors);
  const colorList = Array.isArray(colors.colors) ? colors.colors : [];

  const categoryList = useMemo(
    () => (Array.isArray(categories.categories) ? categories.categories : []),
    [categories]
  );

  useEffect(() => {
    dispatch(fetchProductByIdStart(id));
    dispatch(fetchCategories());
    dispatch(getAllColorStart());
  }, [dispatch, id]);

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

    try {
      const urlWithIndex = await Promise.all(
        images.map(async (image, index) => ({
          index,
          url: await uploadImageToFirebase(image),
        }))
      );

      const sortedUrls = urlWithIndex
        .sort((a, b) => a.index - b.index)
        .map((item) => item.url);

      dispatch(
        updateProductStart({
          id,
          productname,
          description,
          price,
          categoryid,
          quantity,
          images: sortedUrls,
        })
      );

      navigate("/admin/allProduct");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const options = useMemo(
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

  const imageAddPreviews = newImages.map((image, index) => (
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
        onClick={() => handleRemoveFile(index)}
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    addForm.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddProductColor = async (values) => {
    const productColorid = uuidv4();
    try {
      const url = await Promise.all(
        newImages.map((image) => uploadImageToFirebase(image))
      );
      const { colorid, quantity } = values;

      dispatch(
        addProductColorStart({
          productColorid,
          quantity,
          productid: id,
          colorid,
          url,
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ width: "100%", padding: "100px" }}>
      <Card className="p-3">
        <Form
          onFinish={handleSubmit}
          form={formUpdate}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="productname"
            rules={[{ required: true, message: "Chưa điền tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới thiệu"
            name="description"
            rules={[{ required: true, message: "Chưa điền giới thiệu!" }]}
          >
            <TextArea showCount maxLength={500} placeholder="can resize" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Chưa điền giá!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="categoryid"
            rules={[{ required: true, message: "Chưa chọn danh mục!" }]}
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
        </Form>

        {selectedProduct?.product.ProductColors.map((item) => (
          <div key={item.id} className="border border-gray-300 p-3 mb-5">
            <Form initialValues={{ quantity: item.quantity }} layout="vertical">
              <p>
                <b>Màu sắc</b>: {item.Color.name}
              </p>
              <p className="mt-2">
                <i>Ảnh hiện tại:</i>
              </p>
              <div className="flex">
                {item.ProductImages.map((image) => (
                  <img key={image.id} src={image.image} className="w-[50px]" />
                ))}
              </div>
              <Form.Item label="Cập nhật ảnh mới" name="image">
                <input type="file" multiple onChange={handleFileChange} />
                <div style={{ display: "flex" }}>{imagePreviews}</div>
              </Form.Item>
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Chưa điền số lượng!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </div>
        ))}

        <div className="flex">
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
          <Button
            onClick={showModal}
            className="ml-2"
            type="primary"
            htmlType="submit"
          >
            Thêm màu khác
          </Button>
          <Modal
            title="Thêm màu khác"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
          >
            <Form
              form={addForm}
              onFinish={(values) => handleAddProductColor(values)}
              layout="vertical"
            >
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
                />
              </Form.Item>

              <Form.Item label="Ảnh sản phẩm" name="image">
                <input onChange={handleAddFile} type="file" multiple />
                <div style={{ display: "flex" }}>{imageAddPreviews}</div>
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
            </Form>
          </Modal>
        </div>
      </Card>
    </div>
  );
};

export default UpdateProduct;
