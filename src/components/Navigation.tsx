import React from 'react';
import {  Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart} from 'react-icons/fa';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';


const NavigationWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.footerBackground};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1.5rem 1rem;
  overflow: hidden;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
`

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
  const { t } = useTranslation('navigation');
  const { items } = useShoppingCart();

  return (
    <NavigationWrapper>
      <TopSection>
        <Logo to="/">
          <LogoText>Slow Bakery</LogoText>
        </Logo>
      </TopSection>
      <MiddleSection>
        <NavLinks>
          <li>
            <StyledNavLink to="/our-story">
              {t('ourStory')}
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/preorder">
              {t('preorder')}
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/subscription">
              {t('subscription')}
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/contact">
              {t('contact')}
            </StyledNavLink>
          </li>
        </NavLinks>
      </MiddleSection>
      <RightSection>
        {items.length > 0 && (
          <StyledNavLink to="/shopping-cart">
            <CartIconWrapper>
              <FaShoppingCart size={24} />
              {items.length > 0 && <CartBubble>{items.length}</CartBubble>}
            </CartIconWrapper>
          </StyledNavLink>
        )}
        <LanguageSwitcher />
        {/* FIXME: fix dark theme colors */}
        {/* <ThemeSwitcher /> */}
      </RightSection>
    </NavigationWrapper>
  );
};

export default Navigation;