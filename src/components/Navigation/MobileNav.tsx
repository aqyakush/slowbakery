import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import LanguageSwitcher from '../LanguageSwitcher';
import { StyledNavLink } from './DesktopNav';

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

type StyledProps = {
    $isOpen: boolean;
  }

const MobileMenu = styled.div<StyledProps>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
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

const Overlay = styled.div<StyledProps>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

type MobileNaveProps = {
    isMenuOpen: boolean;
    closeMenu: () => void;
    menuItems: {
        to: string;
        label: string;
    }[];
};

const MobileNav: React.FC<MobileNaveProps> = ({ isMenuOpen, closeMenu, menuItems}) => {
  return (
    <>
      <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
      <MobileMenu $isOpen={isMenuOpen}>
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
    </>
    
  );
};

export default MobileNav;