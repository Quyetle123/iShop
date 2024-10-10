import { Card, Image } from 'antd';
import styled from 'styled-components';

export const OrdersContainer = styled.div`
  padding: 40px;
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledCard = styled(Card)`
  width: 80%;
  margin-bottom: 30px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .ant-card-head {
    background-color: #fafafa;
    font-weight: bold;
  }

  .ant-card-body {
    padding: 30px;
  }
`;

export const OrderDetailImage = styled(Image)`
  border-radius: 8px;
  width: 80px;
  object-fit: cover;
`;
