import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaApple } from 'react-icons/fa';
import { Carousel, Row, Col } from 'antd';
import { fetchProductesStart } from '../../../redux/slices/productSlice.jsx';
import {
  CategoryCard,
  CategoryContainer,
  ImgContainer,
  Main,
  ProductCard,
  Title,
  TitleContainer,
} from './style';

const Shop = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products, loading } = useSelector((state) => state.products);
  const categoryList = Array.isArray(categories.categories) ? categories.categories : [];
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProductesStart());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const groupProducts = (products, groupSize) => {
    const grouped = [];
    for (let i = 0; i < products.length; i += groupSize) {
      grouped.push(products.slice(i, i + groupSize));
    }
    return grouped;
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === null) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.categoryId === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  const images = [
    { id: 1, image: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/da/8e/da8eba2f63bb581e77876158d035764f.png' },
    { id: 2, image: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/70/07/7007476ab205d1e806b3079d4d3eaceb.png' },
    { id: 3, image: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/66/b2/66b2b0735f5c40fdab7da671a4056754.png' },
    { id: 4, image: 'https://cdnv2.tgdd.vn/mwg-static/common/Banner/9c/80/9c8001c1c10c2482545a84346cb63846.png' },
  ];

  return (
    <Main>
      {/* <Slideshow images={images} /> */}
      <CategoryContainer>
        <CategoryCard onClick={() => handleCategoryClick(null)}>
          <h3>All Products</h3>
        </CategoryCard>
        {categoryList.map((category) => (
          <CategoryCard key={category.id} onClick={() => handleCategoryClick(category.id)}>
            <img src={category.imageUrl} alt={category.categoryname} />
            <h3>{category.categoryname}</h3>
          </CategoryCard>
        ))}
      </CategoryContainer>
      <div>
        <Title className="pb-5">
          <FaApple /> {filteredProducts.length ? 'Filtered Products' : 'All Products'}
        </Title>
        <Carousel style={{ padding: '0 150px' }} dots={true}>
          {groupProducts(filteredProducts, 4).map((group, index) => (
            <div key={index}>
              <Row gutter={24}>
                {group.map((product) => (
                  <Col span={6} key={product.id}>
                    <ProductCard>
                      <Link to={`/detail/${product.id}`}>
                        <ImgContainer>
                          <img
                            src={product.ProductColors?.[0]?.ProductImages?.[0]?.image || 'No Image Available'}
                            alt={product.productname}
                          />
                        </ImgContainer>
                        <TitleContainer>
                          <p style={{ marginBottom: '20px' }}>{product.productname}</p>
                          <p>
                            <b>{product.price.toLocaleString('vi-VN')}₫</b>
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
    </Main>
  );
};

export default Shop;
