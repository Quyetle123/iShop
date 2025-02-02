import styled from "styled-components";

export const Main = styled.div`
  background-color: #3e3e3f;
`;

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 150px;
`;

export const VoucherContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 150px;
`;

export const VoucherCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 10px #333;
  width: 24%;
  height: 140px;
  display: flex;
`;

export const VoucherAside = styled.div`
  width: 25%;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VoucherContent = styled.div`
  width: 75%;
  background-color: #fff;
  padding: 10px;
`;

export const VoucherDescription = styled.p`
  font-weight: bold;
  color: #333;
`

export const VoucherP = styled.p`
  font-size: 13px;
`

export const CategoryCard = styled.div`
  background-color: #2c2c2e;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  width: 180px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  img {
    width: 100%;
    border-radius: 10px;
  }

  h3 {
    color: #ffffff;
    margin-top: 10px;
  }
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 35px;
  margin: 30px 150px 0 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 40px;
    margin-right: 10px;
  }
`;

export const ProductCard = styled.div`
  height: 450px;
  background-color: #2c2c2e;
  border-radius: 20px;
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px;
`;
export const TitleContainer = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: white;
  }
`;
