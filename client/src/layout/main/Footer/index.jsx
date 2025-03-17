// Footer.js
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaRss,
  FaLinkedinIn,
} from "react-icons/fa";
import { BoxIcon, Footer, FooterBorder, FooterBottom, FooterBottomMap, FooterTop, FooterTopTitle, IconWrapper, LocationText, MapIcon, Title } from "./style";

const FooterComponent = () => {
  return (
    <Footer>
      <FooterTop>
        <FooterTopTitle>
          <Title>THÔNG TIN LIÊN HỆ</Title>
          <p>
            <i className="bx bxs-map"></i> 319 C16 Lý Thường Kiệt, Phường 15,
            Quận 11, Tp.HCM
          </p>
          <p>
            <i className="bx bxs-phone-call"></i> 076 922 0162
          </p>
          <p className="email">
            <i className="bx bxs-envelope"></i> demonhunterg@gmail.com
          </p>
          <p>
            <i className="bx bxl-shopify"></i> demonhunterp
          </p>
          <IconWrapper>
            <BoxIcon color="#3a589d">
              <FaFacebookF />
            </BoxIcon>
            <BoxIcon color="#3b6994">
              <FaInstagram />
            </BoxIcon>
            <BoxIcon color="#2478ba">
              <FaTwitter />
            </BoxIcon>
            <BoxIcon color="#fc7600">
              <FaRss />
            </BoxIcon>
            <BoxIcon color="#0072b7">
              <FaLinkedinIn />
            </BoxIcon>
          </IconWrapper>
        </FooterTopTitle>
        <FooterTopTitle>
          <Title>LIÊN KẾT</Title>
          <p>Giới thiệu</p>
          <p>Iphone</p>
          <p>Ipad</p>
          <p>Blogs</p>
          <p>Liên hệ</p>
        </FooterTopTitle>
        <FooterTopTitle>
          <Title>HỖ TRỢ</Title>
          <p>Hướng dẫn mua hàng</p>
          <p>Hướng dẫn thanh toán</p>
          <p>Chính sách bảo hành</p>
          <p>Chính sách đổi trả</p>
          <p>Tư vấn khách hàng</p>
        </FooterTopTitle>
        <FooterTopTitle>
          <Title>TẢI ỨNG DỤNG TRÊN</Title>
          <p>
            Ứng dụng iShop hiện có sẵn trên Google Play & App Store. Tải nó
            ngay.
          </p>
        </FooterTopTitle>
      </FooterTop>
      <FooterBorder />
      <FooterBottom>
        <div>
          <p>Bản quyền thuộc về thiết kế website Quyetle</p>
        </div>
        <FooterBottomMap>
          <LocationText>Vị trí của bạn</LocationText>
          <MapIcon />
        </FooterBottomMap>
      </FooterBottom>
    </Footer>
  );
};

export default FooterComponent;
