import type React from "react"
import styled from "styled-components"
import { FaInstagram } from 'react-icons/fa';


const FooterWrapper = styled.footer`
  background-color: ${(props) => props.theme.footerBackground};
  padding: 2rem 0;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
`

const FooterContent = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`

const Copyright = styled.p`
  color: ${(props) => props.theme.textColor};

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 0;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`

const SocialLink = styled.a`
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  font-size: 2rem;
  &:hover {
    color: ${(props) => props.theme.hoverTextColor};
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <Copyright>&copy; 2025 Slow Bakery. All rights reserved.</Copyright>
        <SocialLinks>
          <SocialLink href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer

