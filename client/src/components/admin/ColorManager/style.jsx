import styled from "styled-components";

export const Container = styled.div`
  padding: 100px;
`;

export const AddButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.primary || "#007bff"};
  color: white;
  font-size: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ColorCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  background-color: #fff;
  justify-content: center;
  padding: 30px 0;
  border-radius: 10px;
`;

export const ColorItem = styled.div`
   flex: 0 0 calc(20% - 30px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ImageColor = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
`
