import styled from "styled-components"

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #92400e;
  margin-bottom: 1rem;
`

const Content = styled.div`
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
`

export default function Preorder() {
  return (
    <PageWrapper>
      <Title>Preorder</Title>
      <Content>
        <p>Welcome to our preorder page. Here you can place orders for special items or upcoming events.</p>
        <p>Preorder functionality coming soon!</p>
      </Content>
    </PageWrapper>
  )
}

