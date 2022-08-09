import styled from "styled-components";
import { device } from "./global.styled.js";
export const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8rem;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  color: ${({ theme }) => theme.text};
  @media ${device.tablet} {
    gap: 2rem;
    justify-content: space-between;
  }
`;

export const Search = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  @media ${device.tablet} {
    width: auto;
  }
`;

export const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

export const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  margin-right: ${({ type }) => type === "logOut" && "20px"};
  @media ${device.tablet} {
    margin-right: ${({ type }) => type === "logOut" && "8px"};
  }
  /* @media ${device.mobileL} {
    flex-direction: column;
    gap: 0;
  } */
`;

export const Avatar = styled.img`
  margin-right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

export const LogOutButton = styled.button`
  margin-right: 20px;

  @media ${device.tablet} {
    margin-right: 8px;
  }
`;
