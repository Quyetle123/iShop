import styled from "styled-components";

import { IoMdMap } from "react-icons/io";

// Styled components
export const Footer = styled.footer`
  background-color: #101010;
  color: #fff;
  line-height: 1.6;
`;

export const FooterTop = styled.div`
  padding: 60px 150px;
  display: flex;
  justify-content: space-between;
`;

export const FooterTopTitle = styled.div`
  width: 23%;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
`;

export const IconWrapper = styled.div`
  margin-top: 25px;
  display: flex;
`;

export const BoxIcon = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 15px;
  font-size: 22px;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.5s;
  background-color: ${(props) => props.color};

  &:hover {
    opacity: 1;
  }
`;

export const FooterBorder = styled.div`
  border-bottom: 1px solid rgba(204, 204, 215, 0.6);
`;

export const FooterBottom = styled.div`
  padding: 15px 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

export const FooterBottomMap = styled.div`
  display: flex;
  align-items: center;
`;

export const LocationText = styled.p`
  color: #fff;
  margin-right: 10px;
`;

export const MapIcon = styled(IoMdMap)`
  font-size: 30px;
  cursor: pointer;
`;