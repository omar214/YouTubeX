import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 30px;
  margin: 30px 0px;
  color: ${props => props.theme.text};
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  width: 60%;
  max-width: 60%;
`;
export const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

export const Text = styled.span`
  font-size: 14px;
`;

export const Button = styled.button`
  justify-self: flex-end;
  align-self: flex-start;
  text-align: right;
  padding: 10px 15px;
  background-color: transparent;
  /* border: none; */
  border: 1px solid red;
  border-radius: 3px;
  color: red;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
`;
