import styled from "styled-components"

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 1rem;
`

export const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

export const Content = styled.div`
  font-size: 1.1rem;
  color: ${(props) => props.theme.content};
  line-height: 1.6;
`

export const Button = styled.button`
  background-color: ${(props) => props.theme.textColor};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: ${(props) => props.theme.hoverTextColor};
  }
`;