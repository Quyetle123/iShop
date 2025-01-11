/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  CommentContentP,
} from "./style";
import { useEffect, useState } from "react";
import { fetchProductByIdStart } from "../../../redux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCartStart,
  fetchCartByAccountidStart,
  updateQuantityStart,
} from "../../../redux/slices/cartSlice";
import { getToken } from "../../../utils/token";
import dayjs from "dayjs";
import Slideshow from "../slideshow";
import { message } from "antd";

const Detail = () => {
  const token = getToken();
  const [apiColor, setApiColor] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);
  const product = selectedProduct ? selectedProduct.product : null;
  const { carts } = useSelector((state) => state.carts);
  useEffect(() => {
    dispatch(fetchProductByIdStart(id));
    if (token) {
      dispatch(fetchCartByAccountidStart(token.id));
    }
  }, [dispatch, id]);

  const handleCheckedColor = (i) => {
    setApiColor(i);
  };
  const quantity = 1;
  const navigate = useNavigate();
  const handleAddToCart = () => {
    let duplicateFound = false;
    carts.carts?.forEach((cart) => {
      if (cart.ProductColor.id == product.ProductColors[apiColor].id) {
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
          productColorid: product.ProductColors[apiColor].id,
          accountid: token.id,
        })
      );
    }

    setLoading(true);

    try {
      message.success("Sản phẩm đã được thêm vào giỏ hàng!");
      setTimeout(() => {
        navigate("/cart");
        window.location.reload();
      }, 1000);
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
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
          <Slideshow images={product.ProductColors[apiColor].ProductImages} />
        </DetailAside>
        <DetailArticle>
          <h1>{product.productname}</h1>
          <h2>{product.price.toLocaleString("vi-VN")} đ</h2>
          <p>{product.description}</p>
          <p>Màu sắc: {product.ProductColors[apiColor].Color.name}</p>
          <div className="flex space-x-4 mt-5">
            {product.ProductColors.map((color, index) => (
              <input
                key={color.id}
                onClick={() => handleCheckedColor(index)}
                type="radio"
                id="radio1"
                name="group"
                value="option1"
                style={{
                  appearance: "none",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "3.5px solid #fff",
                  backgroundColor: `${color.Color.hex_code}`,
                  cursor: "pointer",
                  boxShadow: index === apiColor ? "0 0 10px #fff" : "none",
                  transition: "box-shadow 0.2s ease-in-out",
                }}
              />
            ))}
          </div>
          <button
            style={{
              display:
                product.ProductColors[0].quantity > 0 && token
                  ? "block"
                  : "none",
            }}
            onClick={() => handleAddToCart()}
          >
            Thêm vào giỏ hàng
          </button>
          <button
            style={{
              display: product.ProductColors[0].quantity > 0 ? "none" : "block",
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
                <CommentContentP>
                  <b>{comment.Account.username}</b>
                </CommentContentP>
                <div>{renderStars(comment.rating)}</div>
                <CommentContentP>{comment.comment}</CommentContentP>
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
