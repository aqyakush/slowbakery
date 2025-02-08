import styled from "styled-components"
import { PageWrapper, Title, Content } from "../../components/StyledComponets"

const Question = styled.h2`
  font-size: 1.5rem;
  color: #92400e;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`

export default function FAQ() {
  return (
    <PageWrapper>
      <Title>Frequently Asked Questions</Title>
      <Content>
        <Question>What are your opening hours?</Question>
        <p>We are open Monday to Friday from 7am to 7pm, Saturday from 8am to 6pm, and Sunday from 8am to 3pm.</p>

        <Question>Do you offer gluten-free options?</Question>
        <p>Yes, we have a selection of gluten-free items available daily. Please ask our staff for details.</p>

        <Question>Can I place a custom order?</Question>
        <p>We love creating custom orders. Please contact us at least 48 hours in advance for custom requests.</p>

        <Question>Do you deliver?</Question>
        <p>
          We offer local delivery for orders over $50. Please check our delivery area or contact us for more
          information.
        </p>
      </Content>
    </PageWrapper>
  )
}

