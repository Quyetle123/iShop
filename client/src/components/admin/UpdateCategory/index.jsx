import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryById, updateCategoryStart } from "../../../reudux/slices/categorySlice";

const UpdateCategory = () => {
  const { id } = useParams();
  const [formUpdate] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCategory } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      formUpdate.setFieldsValue({
        categoryname: selectedCategory.category.categoryname,
        description: selectedCategory.category.description,
      });
    }
  }, [selectedCategory, formUpdate]);

  const handleSubmit = (values) => {
    const categoryname = values.categoryname;
    const description = values.description;
    dispatch(updateCategoryStart({id, categoryname, description}))
    navigate('/admin/allCategories');
  };

  return (
    <div style={{ width: "100%", marginTop: '100px' }}>
      <Form
        onFinish={handleSubmit}
        form={formUpdate}
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

export default UpdateCategory;
