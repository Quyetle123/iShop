import { useEffect, useState } from "react";
import { Rate, Form, Input, Typography } from "antd";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCommentStart } from "../../../reudux/slices/commentSlice";
import { getToken } from "../../../utils/token";
import { fetchProductColorByIdStart } from "../../../reudux/slices/productColorSlice";

const { TextArea } = Input;
const { Title } = Typography;

const Comment = () => {
  const { productColorid } = useParams();
  const token = getToken();
  const accountid = token.id;
  const dispatch = useDispatch();
  const { productColor } = useSelector((state) => state.productColors);
  const productComment = productColor ? productColor.productColor : null;
  useEffect(() => {
    dispatch(fetchProductColorByIdStart(productColorid));
  }, [dispatch, productColorid]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Bạn chưa bình luận và đánh giá sản phẩm");
      return;
    }
    const productid = productComment.productid
    dispatch(addCommentStart({rating, comment, productid, accountid}))
    navigate(`/detail/${productid}`)
  };

  if (!productColor) {
    return <div>Loading...</div>;
  }

  return (
    <S.ReviewContainer>
      <S.StyledCard>
        <S.ProductInfo>
          <S.ProductImage src={productComment.ProductImages[0].image} alt="Sản phẩm" />
          <S.ProductDetails>
            <Title level={4}>{productComment.Product.productname}</Title>
            <p>{productComment.Product.description}</p>
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
