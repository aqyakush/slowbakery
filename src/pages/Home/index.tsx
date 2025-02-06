import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const Section = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const ImageWrapper = styled.div`
  flex: 1;
`;

const TextWrapper = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #92400e;
  margin-bottom: 1rem;
`

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #FEE995;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  margin: 0 10px;
  text-align: left;
`;

const CardButton = styled.button`
  background-color: #92400e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #b45309;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Section>
        <ImageWrapper>
          <img src="https://www.theperfectloaf.com/wp-content/uploads/2015/12/theperfectloaf-mybestsourdoughrecipe-title-1.jpg" alt="Slow Bakery" style={{ width: '100%', height: 'auto' }} />
        </ImageWrapper>
        <TextWrapper>
          <SectionTitle>Slow Bakery From Helsinki</SectionTitle>
          <p>
            At Slow Bakery, we bake sourdough with love, patience, and attention to detail. Every loaf is handcrafted using traditional methods, high-quality ingredients, and plenty of care to bring out the best flavors and textures.
          </p>
          <p>
            Based in Helsinki, we take pride in sharing our passion for real bread with our community. Whether you’re looking for a classic wheat loaf or something with unique inclusions, we invite you to experience the joy of freshly baked sourdough.
          </p>
          <p>
            Come taste the difference—baked for you, with love.
          </p>
        </TextWrapper>
      </Section>

      <Section>
        <CardWrapper>
          <Card>
            <h3>Pre-order</h3>
            <p>Pre-order your favorite bread from our curated selection. Orders are placed before baking to ensure freshness, prevent overproduction, and reduce waste. Click the link to place your pre-order!</p>
            <CardButton onClick={() => navigate('/preorder')}>Pre-order Now</CardButton>
          </Card>
          <Card>
            <h3>Subscription</h3>
            <p>Join our bread subscription and receive a freshly baked loaf at your doorstep every Monday. Each week brings a new surprise, from classic wheat to flavorful loaves with delicious inclusions. For more details, click the link!</p>
            <CardButton onClick={() => navigate('/subscription')}>Explore Subscription</CardButton>
          </Card>
        </CardWrapper>
      </Section>
    </PageWrapper>
  )
}

