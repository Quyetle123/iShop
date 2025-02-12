import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchWishlistByAccountidStart } from "../../../redux/slices/wishlistSlice";
import { getToken } from "../../../utils/token";
import { Col, Row } from "antd";
import { ImgContainer, ProductCard, TitleContainer } from "../Home/style";
import { Link } from "react-router-dom";

const WishList = () => {
    const auth = getToken()
    const dispatch = useDispatch();

    const { wishlists } = useSelector((state) => state.wishlists);
    const wishlistList = Array.isArray(wishlists.wishlists) ? wishlists.wishlists : [];
    console.log("danh sach co", wishlistList);
    useEffect(() => {
        dispatch(fetchWishlistByAccountidStart(auth.id));
    }, [dispatch]);
    return (
       <div className="pr-[150px] pl-[150px] mt-[100px] mb-[100px]">
            <Row gutter={24}>
              {wishlistList.map((product) => (
                <Col span={6} key={product.id}>
                  <ProductCard>
                    <Link to={`/detail/${product.id}`}>
                      <ImgContainer>
                        <img
                          src={
                            product.ProductColor?.ProductImages?.[0]
                              ?.image || "No Image Available"
                          }
                          alt={product.productname}
                        />
                      </ImgContainer>
                      <TitleContainer>
                        <p style={{ marginBottom: "20px" }}>
                          {product.ProductColor.Product.productname}
                        </p>
                        <p>
                          <b>{product.ProductColor.Product.price.toLocaleString("vi-VN")}₫</b>
                        </p>
                      </TitleContainer>
                    </Link>
                  </ProductCard>
                </Col>
              ))}
            </Row>
          </div>
    )
}

export default WishList