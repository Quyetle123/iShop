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
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../reudux/slices/categorySlice";

const Home = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const categoryList = Array.isArray(categories.categories)
    ? categories.categories
    : [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
          <Title>
            <FaApple />
            {category.categoryname}
          </Title>
          <ProductContainer>
            {(Array.isArray(category.Products) ? category.Products : []).map(
              (product) => (
                <ProductCard key={product.id}>
                  <Link to={`/detail/${product.id}`}>
                    <ImgContainer>
                      <img src={product.imageUrl} alt={product.productname} />
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
              )
            )}
          </ProductContainer>
        </div>
      ))}
    </Main>
  );
};

export default Home;
