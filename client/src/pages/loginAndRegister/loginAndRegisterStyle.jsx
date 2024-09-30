import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://restore.bg/modules/ph_simpleblog/featured/75.jpg);
  background-repeat: no-repeat;
  background-size: cover;
`;

export const FormLogin = styled.div`
  max-width: 450px;
  border-radius: 3px;
  background: rgba(9, 20, 38, 0.8);
  flex-grow: 1;
  padding: 30px 30px 40px 30px;
  box-shadow: 0 0 17px 2px rgba(255, 255, 255, 0.8);
`;

export const FormHeading = styled.h1`
  font-size: 25px;
  color: #f5f5f5;
  text-align: center;
  margin-bottom: 30px;
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  border-bottom: 1px solid #fff;
  margin-top: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  i {
    color: #fff;
    font-size: 14px;
    padding-right: 10px;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: #f5f5f5;
    flex-grow: 1;

    &::placeholder {
      color: #f5f5f5;
    }
  }
`;

export const EyeIcon = styled.div`
  padding-right: 0;
  cursor: pointer;
  margin-top: 2px;

  i {
    color: #f5f5f5;
  }
`;

export const RememberForgot = styled.div`
  height: 30px;
  color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  input {
    margin-right: 10px;
  }

  span {
    text-decoration: none;
    color: #f5f5f5;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  margin-top: 10px;
  color: white;
  border: 1px solid white;
  height: 30px;
  font-size: 17px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export const DiffrentTitle = styled.span`
  color: #f5f5f5;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

export const DiffrentLogin = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const LoginFacebook = styled.button`
  width: 190px;
  height: 30px;
  background-color: transparent;
  color: #f5f5f5;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: 0.5s;

  &:hover {
    background-color: #f5f5f5;
    color: black;
    cursor: pointer;
  }
`;

export const LoginGoogle = styled.button`
  width: 190px;
  height: 30px;
  background-color: transparent;
  color: #f5f5f5;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: 0.5s;

  &:hover {
    background-color: #f5f5f5;
    color: black;
    cursor: pointer;
  }
`;

export const ChooseSex = styled.div`
  display: flex;
  color: #f5f5f5;

  input {
    margin-left: 30px;
  }
`;

export const DateOfBirth = styled.div`
  color: #f5f5f5;
  margin: 15px 0;

  input {
    width: 74%;
    margin-left: 20px;
  }
`;

export const Rules = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  height: 30px;

  a {
    color: #fff;
  }
`;
