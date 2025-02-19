import { useDispatch, useSelector } from "react-redux";
import Slideshow from "../slideshow";
import {
  CategoryCard,
  CategoryContainer,
  // VoucherContainer,
  ImgContainer,
  Main,
  ProductCard,
  Title,
  TitleContainer,
  // VoucherCard,
  // VoucherAside,
  // VoucherContent,
  // VoucherDescription,
  // VoucherP,
} from "./style";
import {
  FaApple,
  // FaShoppingCart, FaClock
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { Carousel, Row, Col, Modal } from "antd";
import { fetchVourchersStart } from "../../../redux/slices/vourcherSlice";
import { getToken } from "../../../utils/token";
import { getOrderDraftStart } from "../../../redux/slices/orderSlice";
// import dayjs from "dayjs";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = getToken();
  const [isDraftOrderModalOpen, setIsDraftOrderModalOpen] = useState(false);
  const { orderDraft } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderDraftStart(token?.id));
  }, [dispatch]);


  useEffect(() => {
    const fetchDraftOrder = async () => {
      if (token) {
        try {
          if (orderDraft) {
            setIsDraftOrderModalOpen(true);
          }
        } catch (error) {
          console.error("Lỗi lấy đơn hàng nháp:", error);
        }
      }
    };

    fetchDraftOrder();
  }, []);

  const { categories } = useSelector((state) => state.categories);
  const categoryList = Array.isArray(categories.categories)
    ? categories.categories
    : [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { vourchers } = useSelector((state) => state.vourchers);
  const voucherList = Array.isArray(vourchers.vourchers)
    ? vourchers.vourchers
    : [];

  console.log(voucherList);

  useEffect(() => {
    dispatch(fetchVourchersStart());
  }, [dispatch]);

  const groupProducts = (products, groupSize) => {
    const grouped = [];
    for (let i = 0; i < products.length; i += groupSize) {
      grouped.push(products.slice(i, i + groupSize));
    }
    return grouped;
  };

  const images = [
    {
      id: 1,
      image:
        "https://cdnv2.tgdd.vn/mwg-static/common/Banner/da/8e/da8eba2f63bb581e77876158d035764f.png",
    },
    {
      id: 2,
      image:
        "https://cdnv2.tgdd.vn/mwg-static/common/Banner/70/07/7007476ab205d1e806b3079d4d3eaceb.png",
    },
    {
      id: 3,
      image:
        "https://cdnv2.tgdd.vn/mwg-static/common/Banner/66/b2/66b2b0735f5c40fdab7da671a4056754.png",
    },
    {
      id: 4,
      image:
        "https://cdnv2.tgdd.vn/mwg-static/common/Banner/9c/80/9c8001c1c10c2482545a84346cb63846.png",
    },
  ];

  return (
    <Main>
      <Modal
        title="Bạn có đơn hàng chưa thanh toán"
        open={isDraftOrderModalOpen}
        onCancel={() => setIsDraftOrderModalOpen(false)}
        onOk={() => {
          setIsDraftOrderModalOpen(false); // Đóng Modal
          navigate(`/pay`);
        }}
      >
        <p>
          Bạn có một đơn hàng chưa thanh toán. Bạn có muốn tiếp tục thanh toán
          không?
        </p>
      </Modal>

      <Slideshow images={images} />
      {/* <VoucherContainer>
        {voucherList.slice(0, 4).map((voucher) => (
          <VoucherCard key={voucher.id}>
            <VoucherAside>
              <FaShoppingCart className="text-[#fff] text-[25px]" />
            </VoucherAside>
            <VoucherContent>
              <VoucherDescription>{voucher.description}</VoucherDescription>
              <div className="flex items-center mt-2">
                <FaClock className="text-[20px] mr-1" />{" "}
                <VoucherP>
                  Hiệu lực:{" "}
                  {dayjs(voucher.valid_from).format("DD/MM/YYYY HH:mm")} -{" "}
                  {dayjs(voucher.valid_to).format("DD/MM/YYYY HH:mm")}
                </VoucherP>
              </div>
              {voucher.VoucherProducts.length >= 1 && (
                <VoucherP>
                  <Link to={`/detail/${voucher.VoucherProducts[0].product_id}`}>
                    Xem sản phẩm
                  </Link>
                </VoucherP>
              )}
            </VoucherContent>
          </VoucherCard>
        ))}
      </VoucherContainer> */}

      <CategoryContainer>
        {categoryList.map((category) => (
          <CategoryCard
            key={category.id}
            onClick={() => navigate(`/${category.id}`)}
          >
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
        </div>
      ))}
    </Main>
  );
};

export default Home;
