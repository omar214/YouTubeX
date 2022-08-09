import styled from "styled-components";
import { device } from "./global.styled.js";

export const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  /* ${({ type }) =>
    type !== "sm" &&
    `
     display: flex;
      flex-direction: column;
  `} */
  gap: 10px;
  @media ${device.laptop} {
    margin-bottom: 30px;
  }
`;

export const Image = styled.img`
  width: 80%;
  max-width: 80%;
  width: ${(props) => (props.type === "sm" ? "60%" : "80%")};
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  /* flex: ${(props) => (props.type === "sm" ? "120px" : "202px")};; */
`;

export const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

export const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

export const Texts = styled.div``;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

export const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
