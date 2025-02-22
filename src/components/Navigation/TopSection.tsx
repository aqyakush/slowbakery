import React from 'react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import LanguageSwitcher from '../LanguageSwitcher';
import { StyledNavLink } from './DesktopNav';

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  position: relative
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  position: absolute;
  left: 1rem;
  z-index: 1;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  white-space: nowrap;
  position: absolute;
  right: 1rem;
  z-index: 1;
`;

const CartIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CartBubble = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
`;

const DesktopLanguageWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

type TopSectionProps = {
  toggleMenu: () => void;
};

const TopSection: React.FC<TopSectionProps> = ({toggleMenu}) => {
  const { items } = useShoppingCart();
  return (
    <Section>
      <HamburgerButton onClick={toggleMenu}>
        <FaBars />
      </HamburgerButton>
      <Logo to="/">
        <LogoText>Slow Bakery</LogoText>
      </Logo>
      <RightSection>
        {items.length > 0 && (
          <StyledNavLink to="/shopping-cart">
            <CartIconWrapper>
              <FaShoppingCart size={24} />
              {items.length > 0 && <CartBubble>{items.length}</CartBubble>}
            </CartIconWrapper>
          </StyledNavLink>
        )}
        <DesktopLanguageWrapper>
          <LanguageSwitcher />
        </DesktopLanguageWrapper>
      </RightSection>
    </Section>
  );
};

export default TopSection;