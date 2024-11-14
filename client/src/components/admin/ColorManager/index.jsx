import { Form, Input, Modal } from "antd";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addColorStart,
  getAllColorStart,
} from "../../../reudux/slices/colorSlice";

const ColorManager = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    dispatch(addColorStart({ name: values.name, hex_code: values.hex_code }));
    setIsModalOpen(false);
    form.resetFields();
  };

  const { colors } = useSelector((state) => state.colors);
  const colorList = Array.isArray(colors.colors) ? colors.colors : [];

  useEffect(() => {
    dispatch(getAllColorStart());
  }, [dispatch]);

  return (
    <S.Container>
      <S.AddButton onClick={showModal}>+</S.AddButton>
      <Modal
        title="Thêm màu sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Chưa điền tên tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã màu"
            name="hex_code"
            rules={[
              {
                required: true,
                message: "Chưa điền mã màu!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <S.ColorCard>
        {colorList.map((color) => (
          <S.ColorItem key={color.id}>
            <S.ImageColor style={{ backgroundColor: `${color.hex_code}` }} />
            <p style={{ color: `${color.hex_code}` }}>{color.name}</p>
          </S.ColorItem>
        ))}
      </S.ColorCard>
    </S.Container>
  );
};

export default ColorManager;
