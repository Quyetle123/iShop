import { useDispatch, useSelector } from "react-redux";
import {
  DetailArticle,
  DetailAside,
  DetailContainer,
  CommentSection,
  CommentCard,
  Avatar,
  CommentContent,
  Main,
} from "./style";
import { useEffect } from "react";
import { fetchProductByIdStart } from "../../../reudux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCartStart,
  fetchCartByAccountidStart,
  updateQuantityStart,
} from "../../../reudux/slices/cartSlice";
import { getToken } from "../../../utils/token";
import dayjs from "dayjs";

const Detail = () => {
  const token = getToken();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);
  const product = selectedProduct ? selectedProduct.product : null;
  const { carts } = useSelector((state) => state.carts);
  useEffect(() => {
    dispatch(fetchProductByIdStart(id));
    if(token) {
      dispatch(fetchCartByAccountidStart(token.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const quantity = 1;
  const navigate = useNavigate();

  const handleAddToCart = () => {
    let duplicateFound = false;
    carts.carts?.forEach((cart) => {
      if (cart.Product.id == Number(id)) {
        duplicateFound = true;
        dispatch(
          updateQuantityStart({
            id: cart.id,
            quantity: cart.quantity + 1,
          })
        );
      }
    });

    if (!duplicateFound) {
      dispatch(
        addCartStart({
          quantity,
          productid: id,
          accountid: token.id,
        })
      );
    }

    navigate("/cart");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "filled" : ""}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <DetailContainer>
        <DetailAside>
          <img src={product.imageUrl} alt="Product" />
        </DetailAside>
        <DetailArticle>
          <h1>{product.productname}</h1>
          <h2>{product.price.toLocaleString("vi-VN")} đ</h2>
          <p>{product.description}</p>
          <button
            style={{
              display: product.quantity > 0 && token ? "block" : "none",
            }}
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
          <button
            style={{
              display: product.quantity > 0 ? "none" : "block",
              backgroundColor: "lightcoral",
              cursor: "text",
            }}
          >
            Hết hàng
          </button>
          <button>Thêm vào yêu thích</button>
        </DetailArticle>
      </DetailContainer>
      <CommentSection>
        <h3>Bình luận</h3>
        {product.Comments.length > 0 ? (
          product.Comments.map((comment) => (
            <CommentCard key={comment.id}>
              <Avatar>
                {comment.Account.username.charAt(0).toUpperCase()}
              </Avatar>
              <CommentContent>
                <p>
                  <b>{comment.Account.username}</b>
                </p>
                <div>{renderStars(comment.rating)}</div>
                <p>{comment.comment}</p>
                <small>{dayjs(comment.createdAt).format("DD/MM/YYYY")}</small>
              </CommentContent>
            </CommentCard>
          ))
        ) : (
          <p>Chưa có bình luận nào</p>
        )}
      </CommentSection>
    </Main>
  );
};

export default Detail;
