import styled from "styled-components";

export const Main = styled.div`
  background-color: #3e3e3f;
`;

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 150px;
`;

export const CategoryCard = styled.div`
  background-color: #2c2c2e;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  width: 180px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
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
  margin: 0px 150px 0 150px;
  padding-top: 30px;
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
