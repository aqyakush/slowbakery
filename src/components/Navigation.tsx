import React from 'react';
import {  Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaBookOpen, FaBoxOpen, FaBell, FaShoppingCart} from 'react-icons/fa';
import { useShoppingCart } from '../context/ShoppingCartContext';


const NavigationWrapper = styled.nav`
  background-color: #fef3c7;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
`;

const NavigationContent = styled.div`
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #92400e;
`

const NavLinks = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const NavLink = styled(Link)`
  color: #92400e;
  text-decoration: none;
  &:hover {
    color: #b45309;
  }
`

const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const { items } = useShoppingCart();
  return (
    <NavigationWrapper>
      <NavigationContent>
          <Logo to="/">
            <LogoText>Slow Bakery</LogoText>
          </Logo>
          <NavLinks>
            <li>
              <NavLink to="/">
              <IconTextWrapper>
                <FaHome />
                <span>Home</span>
                </IconTextWrapper>
              </NavLink>
            </li>
            <li>
              <NavLink to="/our-story">
              <IconTextWrapper>
                <FaBookOpen />
                <span>Our Story</span>
                </IconTextWrapper>
              </NavLink>
            </li>
            <li>
              <NavLink to="/preorder">
              <IconTextWrapper>
                <FaBoxOpen />
                <span>Preorder</span>
                </IconTextWrapper>
              </NavLink>
            </li>
            <li>
              <NavLink to="/subscription">
              <IconTextWrapper>
                <FaBell />
                <span>Subscription</span>
                </IconTextWrapper>
              </NavLink>
            </li>
            {items.length > 0 && (
              <li>
                <NavLink to="/shopping-cart">
                <CartIconWrapper>
                  <FaShoppingCart size={24} />
                  {items.length > 0 && <CartBubble>{items.length}</CartBubble>}
                </CartIconWrapper>
                </NavLink>
              </li>
            )}
          </NavLinks>
      </NavigationContent>
    </NavigationWrapper>
  );
};

export default Navigation;