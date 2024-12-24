import { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { uploadImageToFirebase } from "../../../firebase/uploadImage";
import { useDispatch } from "react-redux";
import { addPostStart } from "../../../reudux/slices/postSlice";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const handleSave = async (values) => {
    try {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);
      const image = await uploadImageToFirebase(imageFile);

      await dispatch(
        addPostStart({ title: values.title, image, content: htmlContent })
      );
      navigate('/admin/all-posts');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageUpload = ({ file }) => {
    if (file.type.startsWith("image/")) {
      setImageFile(file);
      message.success(`Tải ảnh ${file.name} thành công!`);
    } else {
      message.error("Chỉ được phép tải ảnh!");
    }
  };

  return (
    <div className="m-[90px] p-[50px] bg-[#fff] rounded-[10px] min-h-[600px]">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="space-y-4"
      >
        <Form.Item
          label="Tiêu đề bài viết"
          name="title"
          rules={[{ required: true, message: "Tiêu đề không được để trống!" }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        <Form.Item label="Ảnh chính">
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            onChange={handleImageUpload}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Nội dung bài viết">
          <div className="border rounded-md p-2 min-h-[500px]">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            />
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="float-right">
            Lưu bài viết
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPost;
