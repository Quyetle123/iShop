import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 150px;
  background-color: #101010;
  border-bottom: 1px solid #dee2e6;
  position: relative;
`;

export const Logo = styled.img`
  height: 50px;
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  margin: 0 15px;
`;

export const NavLink = styled.a`
  text-decoration: none;
  font-size: 20px;
  color: #fff;
  position: relative;
  padding-bottom: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: #fdb13a;
  }

  &:hover::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: #fdb13a;
    transform: scaleX(1);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background-color: #fff;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform 0.3s ease;
  }
`;

export const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:hover div {
    display: block;
  }
`;

export const NotifyButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #0056b3;
  }
`;

export const CloseNotify = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
`;

export const NotNotify = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AccountButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #0056b3;
  }
`;

export const NotifyDot = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  display: block;
`;

export const CartIcon = styled.span`
  margin-right: 10px;
`;

export const NotifyMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1000;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1000;
  width: 200px;
`;

export const DropdownItem = styled.a`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #f1f1f1;
  }
`;
