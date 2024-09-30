import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { addCategoryStart } from "../../reudux/slices/categorySlice";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (value) => {
    const categoryname = value.categoryname;
    const description = value.description;
    dispatch(addCategoryStart({ categoryname, description }));
    navigate('/admin/allCategories')
  };
  return (
    <div style={{ width: "100%", marginTop: '100px' }}>
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
        style={{
          margin: "20px 150px",
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
    </div>
  );
};

export default AddCategory;
