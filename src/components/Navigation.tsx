import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';


const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem;

  .desktop-language {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    background-color: ${(props) => props.theme.footerBackground};
    transition: left 0.3s ease-in-out;
    z-index: 1000;
    padding: 1rem;

    .mobile-language {
      margin-top: 2rem;
      padding: 0 1rem;
    }
  }
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;

  li {
    margin: 1rem 0;
  }
`;

const CloseButton = styled(HamburgerButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;


const NavigationWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.footerBackground};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1.5rem 1rem;
  overflow: hidden;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`

const MiddleSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)` // Renamed to avoid conflict with Link
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.hoverTextColor};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  white-space: nowrap;
  position: absolute;
  right: 1rem;
  top: 1.5rem;
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

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('navigation');
  const { items } = useShoppingCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { to: '/our-story', label: t('ourStory') },
    { to: '/preorder', label: t('preorder') },
    { to: '/subscription', label: t('subscription') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <NavigationWrapper>
      <TopSection>
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
          <div className="desktop-language">
            <LanguageSwitcher />
          </div>
        </RightSection>
      </TopSection>

      <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
    
      <MobileMenu isOpen={isMenuOpen}>
        <CloseButton onClick={closeMenu}>
          <FaTimes />
        </CloseButton>
        <MobileNavLinks>
          {menuItems.map((item) => (
            <li key={item.to}>
              <StyledNavLink to={item.to} onClick={closeMenu}>
                {item.label}
              </StyledNavLink>
            </li>
          ))}
        </MobileNavLinks>
        <div className="mobile-language">
          <LanguageSwitcher />
        </div>
      </MobileMenu>

      {/* Desktop navigation */}
      <MiddleSection>
        <NavLinks>
          {menuItems.map((item) => (
            <li key={item.to}>
              <StyledNavLink to={item.to}>
                {item.label}
              </StyledNavLink>
            </li>
          ))}
        </NavLinks>
      </MiddleSection>
    </NavigationWrapper>
  );
};

export default Navigation;