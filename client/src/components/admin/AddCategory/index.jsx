import { Button, Card, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { addCategoryStart } from "../../reudux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { uploadImageToFirebase } from "../../firebase/uploadImage";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const handleSubmit = async (value) => {
    try {
      const imageUrl = await uploadImageToFirebase(image);
      const categoryname = value.categoryname;
      const description = value.description;
      await dispatch(addCategoryStart({ categoryname, description, imageUrl }));
      navigate("/admin/allCategories");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div style={{ padding: "100px" }}>
      <Card style={{ padding: "20px" }}>
        <Form
          onFinish={(value) => handleSubmit(value)}
          layout="vertical"
          name="basic"
          labelCol={{
            span: 40,
          }}
          wrapperCol={{
            span: 260,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Tên danh mục"
            name="categoryname"
            rules={[
              {
                required: true,
                message: "Chưa điền tên danh mục!",
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
            label="Ảnh danh mục"
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
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddCategory;
