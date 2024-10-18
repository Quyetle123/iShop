import styled from "styled-components";

export const ReviewContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const StyledCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
`;

export const ProductDetails = styled.div`
  flex-grow: 1;
`;

export const SubmitButton = styled.button`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;
