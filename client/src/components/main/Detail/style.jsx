import styled from "styled-components";

export const Main = styled.div`
  padding: 50px 150px;
  background-color: #3e3e3f;
  color: #fff;
`;

export const DetailContainer = styled.main`
  display: flex;
`;

export const DetailAside = styled.aside`
  width: 50%;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

export const DetailArticle = styled.article`
  width: 50%;
  padding-left: 50px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 40px;
    margin-top: 30px;
  }

  h2 {
    font-size: 30px;
    color: #c89979;
    margin-top: 10px;
  }

  p {
    margin-top: 15px;
    line-height: 1.5;
  }

  button {
    padding: 10px;
    font-size: 17px;
    font-weight: bold;
    color: white;
    background-color: rgb(150, 150, 150);
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:first-of-type {
      margin-top: 30px;
      background-color: #c89979;
    }

    &:hover {
      background-color: rgb(100, 100, 100);
    }

    &:first-of-type:hover {
      background-color: #c08060;
    }
  }
`;

export const CommentSection = styled.section`
  margin-top: 50px;

  h3 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
  }
`;

export const CommentCard = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15px;
  left: 15px;
  flex-shrink: 0;
`;

export const CommentContent = styled.div`
  margin-left: 90px;
  width: 100%;
  p {
    margin: 0;
  }

  small {
    color: #888;
    margin-top: 5px;
    display: block;
  }

  span {
    font-size: 15px;
    color: #ccc;
    margin-right: 3px;

    &.filled {
      color: #fdb13a;
    }
  }
`;

export const CommentContentP = styled.p`
  color: #333;
`
