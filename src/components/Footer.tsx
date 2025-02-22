import type React from "react"
import styled from "styled-components"
import { FaInstagram } from 'react-icons/fa';


const FooterWrapper = styled.footer`
  background-color: ${(props) => props.theme.footerBackground};
  padding: 2rem 0;
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Copyright = styled.p`
  color: ${(props) => props.theme.textColor};
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const SocialLink = styled.a`
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  font-size: 2rem;
  &:hover {
    color: ${(props) => props.theme.hoverTextColor};
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

