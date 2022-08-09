import styled from "styled-components";
import { device } from "./global.styled.js";

export const Container = styled.div`
  flex: 1;
  transition: 0.5s;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  // add media query
  @media ${device.laptopL} {
    flex: 2;
  }
  @media ${device.tablet} {
    /* display: none;
    visibility: hidden; */

    /* position: fixed; */
    position: fixed;
    z-index: 3;
    width: 0;
  }
`;

export const Wrapper = styled.div`
  padding: 18px 26px;
  position: relative;
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;

  @media ${device.tablet} {
    position: absolute;
    top: 0;
    left: 30px;
  }
`;

export const Img = styled.img`
  height: 25px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  background-color: ${(props) => props.current && props.theme.soft};
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    color: red;
  }
`;

export const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

export const Login = styled.div``;
export const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;
