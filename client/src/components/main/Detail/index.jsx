import { useDispatch, useSelector } from "react-redux";
import { DetailArticle, DetailAside, DetailContainer } from "./style";
import { useEffect } from "react";
import { fetchProductByIdStart } from "../../../reudux/slices/productSlice";
import { useParams } from "react-router-dom";
import { addCartStart } from "../../../reudux/slices/cartSlice";
import { getToken } from "../../../utils/token";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);
  const product = selectedProduct ? selectedProduct.product : null;
  console.log(product);

  useEffect(() => {
    dispatch(fetchProductByIdStart(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const quantity = 1
  const token = getToken();

  const handleAddToCart = async () => {
    await dispatch(addCartStart({
      quantity,
      productid: id,
      accountid: token.id
    }))
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <DetailContainer>
      <DetailAside>
        <img src={product.imageUrl} alt="hi" />
      </DetailAside>
      <DetailArticle>
        <h1>{product.productname}</h1>
        <h2>{product.price.toLocaleString("vi-VN")} đ</h2>
        <p>{product.description}</p>
        <p>
          Có thanh toán: <b>Trả góp</b> khi mua Online (Qua thẻ tín dụng)
        </p>
        <p>
          Gọi đặt mua: <b>1900.6777 (8:00-1:30)</b>
        </p>
        <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
        <button>Thêm vào yêu thích</button>
      </DetailArticle>
    </DetailContainer>
  );
};

export default Detail;
