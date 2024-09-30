import styled from "styled-components";

export const DetailContainer = styled.main`
  display: flex;
  padding: 100px 150px;
`;

export const DetailAside = styled.aside`
  width: 50%;
  display: flex;
  justify-content: center;

  img {
    width: 80%;
  }
`;

export const DetailArticle = styled.article`
  width: 50%;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 40px;
    margin-top: 30px;
  }

  h2 {
    font-size: 30px;
    color: #fdb13a;
    margin-top: 10px;
  }

  p {
    margin-top: 15px;
    line-height: 1.5;
  }

  button {
    padding: 8px;
    font-size: 17px;
    font-weight: bold;
    color: white;
    background-color: #fdb13a;
    border: none;
    border-radius: 3px;
    margin-top: 10px;
    cursor: pointer;

    &:first-of-type {
      margin-top: 30px;
      background-color: rgb(150, 150, 150);
    }
  }
`;
