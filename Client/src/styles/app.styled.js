import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
`;

export const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

export const Wrapper = styled.div`
  padding: 30px;
  height: max-contentx;
`;
