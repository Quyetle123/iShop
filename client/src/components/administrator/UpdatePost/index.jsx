/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { uploadImageToFirebase } from "../../../firebase/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostByIdStart,
  updatePostStart,
} from "../../../redux/slices/postSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const [formUpdate] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedPost } = useSelector((state) => state.posts);
  const post = selectedPost ? selectedPost.post : null;

  useEffect(() => {
    dispatch(fetchPostByIdStart(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      formUpdate.setFieldsValue({
        title: post.title,
      });

      let contentState;

      if (typeof post.content === "string" && post.content.startsWith("<")) {
        const blocksFromHTML = convertFromHTML(post.content);
        contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
      } else if (post.content.blocks) {
        contentState = ContentState.createFromBlockArray(
          post.content.blocks,
          post.content.entityMap
        );
      } else {
        contentState = ContentState.createFromText(post.content);
      }

      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [post, formUpdate]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imageFile, setImageFile] = useState(null);

  const handleUpdate = async (values) => {
    try {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);
      if (imageFile) {
        const image = await uploadImageToFirebase(imageFile);
        await dispatch(
          updatePostStart({
            id,
            title: values.title,
            image,
            content: htmlContent,
          })
        );
      }
      await dispatch(
        updatePostStart({ id, title: values.title, content: htmlContent })
      );
      navigate("/admin/all-posts");
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
        form={formUpdate}
        layout="vertical"
        onFinish={handleUpdate}
        className="space-y-4"
      >
        <Form.Item
          label="Tiêu đề bài viết"
          name="title"
          rules={[{ required: true, message: "Tiêu đề không được để trống!" }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        {post && (
          <img className="w-[100px]" src={post.image} alt="Ảnh bài viết" />
        )}

        <Form.Item label="Thay ảnh">
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
            Chỉnh sửa bài viết
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePost;
