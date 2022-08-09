import styled from "styled-components";
import { device } from "../../styles/global.styled.js";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.text};

  @media ${device.tablet} {
    /* justify-content: flex-start; */
    /* max-width: 800px; */
    height: device-height;
  }

  @media ${device.desktop} {
    /* max-width: 1400px; */
  }
`;
