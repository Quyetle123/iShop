import { useDispatch, useSelector } from "react-redux";
import Slideshow from "../slideshow";
import {
  CategoryCard,
  CategoryContainer,
  ImgContainer,
  Main,
  ProductCard,
  ProductContainer,
  Title,
  TitleContainer,
} from "./style";
import { FaApple } from "react-icons/fa";
import { fetchProductesStart } from "../../../reudux/slices/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const productList = Array.isArray(products.products) ? products.products : [];

  useEffect(() => {
    dispatch(fetchProductesStart());
  }, [dispatch]);

  const iphoneProducts = productList
    .filter((product) => product.categoryid === 12)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 4);
  const macProducts = productList
    .filter((product) => product.categoryid === 13)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 4);
  const ipadProducts = productList
    .filter((product) => product.categoryid === 14)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 4);
  const categories = [
    {
      id: 1,
      name: "iPhone",
      imgSrc:
        "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/IP_Desktop.png",
    },
    {
      id: 2,
      name: "Mac",
      imgSrc:
        "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Mac_Desktop.png",
    },
    {
      id: 3,
      name: "iPad",
      imgSrc:
        "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/IPad_Desktop.png",
    },
    {
      id: 4,
      name: "Watch",
      imgSrc:
        "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Watch_Desktop.png",
    },
    {
      id: 5,
      name: "Tai nghe, loa",
      imgSrc:
        "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Amthanh_Desktop.png",
    },
    {
      id: 6,
      name: "Phụ kiện",
      imgSrc:
        "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/PK_Desktop.png",
    },
  ];

  return (
    <Main>
      <Slideshow />
      <CategoryContainer>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <img src={category.imgSrc} alt={category.name} />
            <h3>{category.name}</h3>
          </CategoryCard>
        ))}
      </CategoryContainer>
      <Title>
        <FaApple />
        Iphone
      </Title>
      <ProductContainer>
        {iphoneProducts.map((product) => (
          <ProductCard key={product.id}>
            <Link to={`/detail/${product.id}`}>
              <ImgContainer>
                <img src={product.imageUrl} alt={product.productname} />
              </ImgContainer>
              <TitleContainer>
                <p style={{ marginBottom: "20px" }}>{product.productname}</p>
                <p>
                  <b>{product.price.toLocaleString("vi-VN")}₫</b>
                </p>
              </TitleContainer>
            </Link>
          </ProductCard>
        ))}
      </ProductContainer>
      <Title>
        <FaApple />
        Mac
      </Title>
      <ProductContainer>
        {macProducts.map((product) => (
          <ProductCard key={product.id}>
            <Link to={`/detail/${product.id}`}>
              <ImgContainer>
                <img src={product.imageUrl} alt={product.productname} />
              </ImgContainer>
              <TitleContainer>
                <p style={{ marginBottom: "20px" }}>{product.productname}</p>
                <p>
                  <b>{product.price.toLocaleString("vi-VN")}₫</b>
                </p>
              </TitleContainer>
            </Link>
          </ProductCard>
        ))}
      </ProductContainer>
      <Title>
        <FaApple />
        Ipad
      </Title>
      <ProductContainer>
        {ipadProducts.map((product) => (
          <ProductCard key={product.id}>
            <Link to={`/detail/${product.id}`}>
              <ImgContainer>
                <img src={product.imageUrl} alt={product.productname} />
              </ImgContainer>
              <TitleContainer>
                <p style={{ marginBottom: "20px" }}>{product.productname}</p>
                <p>
                  <b>{product.price.toLocaleString("vi-VN")}₫</b>
                </p>
              </TitleContainer>
            </Link>
          </ProductCard>
        ))}
      </ProductContainer>
    </Main>
  );
};

export default Home;
