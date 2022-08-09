import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  justify-content: center;
  align-items: center;
`;

