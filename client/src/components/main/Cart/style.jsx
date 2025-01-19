import styled from "styled-components";

export const CartWrapper = styled.main`
  display: flex;
  padding: 50px 150px;
  @media (max-width: 768px) { 
    flex-direction: column;
    padding: 20px 10px; 
  }

`;

export const OutOfStockText = styled.span`
  color:#ff7f7f;
  font-weight: bold;
`;

export const CartArticle = styled.article`
  width: 64%;
  height: 500px;

  @media (max-width: 768px) { 
    width: 100%;
    height: 250px;
  }
`;

export const CartAside = styled.aside`
  margin-left: 1%;
  width: 35%;
  height: 500px;
  
  @media (max-width: 768px) { 
    width: 100%;
  }
`;

export const PriceText = styled.p`
  font-size: 14px;
  color: #333;
`;

