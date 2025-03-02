import styled from "styled-components";

export const Container = styled.div`
  margin-top: 80px;
  padding: 25px;
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

export const BranchName = styled.p`
  font-size: 30px;
  padding: 30px 0;
`
