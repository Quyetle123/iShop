import { useEffect, useState } from "react";
import { Rate, Form, Input, Typography } from "antd";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdStart } from "../../../reudux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { addCommentStart } from "../../../reudux/slices/commentSlice";
import { getToken } from "../../../utils/token";

const { TextArea } = Input;
const { Title } = Typography;

const Comment = () => {
  const { productid } = useParams();
  const token = getToken();
  const accountid = token.id;
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);
  const product = selectedProduct ? selectedProduct.product : null;
  useEffect(() => {
    dispatch(fetchProductByIdStart(productid));
  }, [dispatch, productid]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Bạn chưa bình luận và đánh giá sản phẩm");
      return;
    }
    dispatch(addCommentStart({rating, comment, productid, accountid}))
    navigate(`/detail/${productid}`)
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <S.ReviewContainer>
      <S.StyledCard>
        <S.ProductInfo>
          <S.ProductImage src={product.imageUrl} alt="Sản phẩm" />
          <S.ProductDetails>
            <Title level={4}>{product.productname}</Title>
            <p>{product.description}</p>
          </S.ProductDetails>
        </S.ProductInfo>

        <Title level={3}>Đánh giá sản phẩm</Title>
        <p>Hãy đánh giá độ hài lòng và bình luận về sản phẩm của chúng tôi</p>

        <Form layout="vertical">
          <Form.Item label="Đánh giá">
            <Rate onChange={setRating} value={rating} />
          </Form.Item>

          <Form.Item label="Bình luận">
            <TextArea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Viết bình luận của bạn ..."
            />
          </Form.Item>

          <Form.Item>
            <S.SubmitButton type="primary" onClick={handleSubmit}>
              Lưu đánh giá
            </S.SubmitButton>
          </Form.Item>
        </Form>
      </S.StyledCard>
    </S.ReviewContainer>
  );
};

export default Comment;
