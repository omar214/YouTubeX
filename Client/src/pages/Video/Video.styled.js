import styled from "styled-components";
import { device } from "../../styles/global.styled.js";
export const Container = styled.div`
  display: flex;
  gap: 24px;

  @media ${device.laptop} {
    flex-direction: column;
    gap: 50px;
  }
`;

export const Content = styled.div`
  position: relative;
  flex: 5;
`;
export const VideoWrapper = styled.div``;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  gap: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};

  ${(props) =>
    props.type &&
    `
    display: none;
    @media ${device.tablet} {
      display: block;
    }
  `}
`;

export const Recommendation = styled.div`
  flex: 2;
`;
export const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

export const ChannelName = styled.span`
  font-weight: 500;
`;

export const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
  margin-bottom: 15px;
`;

export const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  width: 25%;
`;
