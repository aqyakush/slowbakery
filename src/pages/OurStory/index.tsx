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

export default function OurStory() {
  return (
    <PageWrapper>
      <Title>Our Story</Title>
      <Content>
        <p>
            Let me introduce myself. My name is Soeun, and I’ve been baking since I moved to Finland. I discovered sourdough baking about a year ago, and I’ve been hooked ever since. One of the main reasons I started baking was because of my autoimmune conditions, which make my body extra sensitive to chemicals, sugar, and other additives. I wanted to create healthy baked goods that both my body and I could enjoy—and now I’m thrilled to share them with you!
        </p>
      </Content>
    </PageWrapper>
  )
}

