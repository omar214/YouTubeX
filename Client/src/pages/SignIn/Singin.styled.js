import styled from "styled-components";
import { device } from "../../styles/global.styled.js";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

export const Wrapper = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
  @media ${device.tablet} {
    width: 400px;
  }
  @media ${device.mobileL} {
    width: 300px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

export const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
//
export const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

export const Links = styled.div`
  margin-left: 50px;
`;

export const Link = styled.span`
  margin-left: 30px;
`;
