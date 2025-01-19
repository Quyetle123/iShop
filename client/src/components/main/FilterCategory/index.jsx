import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { Carousel, Row, Col, Input, Select } from "antd";
import { fetchCategoryById } from "../../../reudux/slices/categorySlice";
import {
  ImgContainer,
  Main,
  ProductCard,
  Title,
  TitleContainer,
} from "./style";
import debounce from "lodash/debounce";

const { Option } = Select;

const Shop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const { selectedCategory, status, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(id));
    }
  }, [dispatch, id]);

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const groupProducts = (products, groupSize) => {
    const grouped = [];
    for (let i = 0; i < products.length; i += groupSize) {
      grouped.push(products.slice(i, i + groupSize));
    }
    return grouped;
  };

  const filteredProducts = selectedCategory?.Products?.filter((product) =>
    product.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = (products) => {
    if (filter === "newest") {
      return [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (filter === "priceLowHigh") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (filter === "priceHighLow") {
      return [...products].sort((a, b) => b.price - a.price);
    } else if (filter === "bestSelling") {
      return [...products].sort((a, b) => b.ProductColors[0]?.sold - a.ProductColors[0]?.sold);
    } else {
      return products;
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const productsToShow = sortedProducts(filteredProducts);

  return (
    <Main>
      {selectedCategory && (
        <>
          <Title className="pb-5">
            <FaApple />
            {selectedCategory.categoryname}
          </Title>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "10px", padding: "0px 150px" }}>
            <Input
              placeholder="Search products..."
              onChange={handleSearch}
              style={{ flex: 1, borderRadius: "8px", padding: "10px", border: "1px solid #ccc" }}
            />
            <Select
              defaultValue=""
              style={{ width: "200px", borderRadius: "8px", background: "transparent" }}
              onChange={handleFilterChange}
              placeholder="Sort by"
            >
              <Option value="">Default</Option>
              <Option value="newest">Mới ra mắt</Option>
              <Option value="bestSelling">Bán chạy</Option>
              <Option value="priceLowHigh">Giá thấp đến cao</Option>
              <Option value="priceHighLow">Giá cao đến thấp</Option>
            </Select>
          </div>
          <Carousel style={{ padding: "0 150px" }} dots={true}>
            {groupProducts(productsToShow, 4).map((group, index) => (
              <div key={index}>
                <Row gutter={24}>
                  {group.map((product) => (
                    <Col span={6} key={product.id}>
                      <ProductCard>
                        <Link to={`/detail/${product.id}`}>
                          <ImgContainer>
                            <img
                              src={
                                product.ProductColors?.[0]?.ProductImages?.[0]
                                  ?.image || "No Image Available"
                              }
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
        </>
      )}
    </Main>
  );
};

export default Shop;
