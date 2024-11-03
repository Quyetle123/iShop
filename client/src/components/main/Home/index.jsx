import { useDispatch, useSelector } from "react-redux";
import Slideshow from "../slideshow";
import {
  CategoryCard,
  CategoryContainer,
  ImgContainer,
  Main,
  ProductCard,
  Title,
  TitleContainer,
} from "./style";
import { FaApple } from "react-icons/fa";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../reudux/slices/categorySlice";
import { Carousel, Row, Col } from "antd";

const Home = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const categoryList = Array.isArray(categories.categories)
    ? categories.categories
    : [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const groupProducts = (products, groupSize) => {
    const grouped = [];
    for (let i = 0; i < products.length; i += groupSize) {
      grouped.push(products.slice(i, i + groupSize));
    }
    return grouped;
  };

  

  return (
    <Main>
      <Slideshow />
      <CategoryContainer>
        {categoryList.map((category) => (
          <CategoryCard key={category.id}>
            <img src={category.imageUrl} alt={category.categoryname} />
            <h3>{category.categoryname}</h3>
          </CategoryCard>
        ))}
      </CategoryContainer>
      {categoryList.map((category) => (
        <div key={category.id}>
          <Title className="pb-5">
            <FaApple />
            {category.categoryname}
          </Title>
          <Carousel style={{ padding: "0 150px" }} dots={true}>
            {groupProducts(
              Array.isArray(category.Products) ? category.Products : [],
              4
            ).map((group, index) => (
              <div key={index}>
                <Row gutter={24}>
                  {group.map((product) => (
                    <Col span={6} key={product.id}>
                      <ProductCard>
                        <Link to={`/detail/${product.id}`}>
                          <ImgContainer>
                            <img
                              src={product.imageUrl}
                              alt={product.productname}
                            />
                          </ImgContainer>
                          <TitleContainer>
                            <p style={{ marginBottom: "20px" }}>
                              {product.productname}
                            </p>
                            <p>
                              <b>{product.price.toLocaleString("vi-VN")}₫</b>
                            </p>
                          </TitleContainer>
                        </Link>
                      </ProductCard>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </Main>
  );
};

export default Home;
