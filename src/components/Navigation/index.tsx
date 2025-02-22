import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import MobileNav from './MobileNav';
import TopSection from './TopSection';
import DesktopNav from './DesktopNav';

const NavigationWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.footerBackground};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1.5rem 1rem;
  overflow: hidden;
`;

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('navigation');
  
  
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
      <TopSection toggleMenu={toggleMenu} />
      <MobileNav isMenuOpen={isMenuOpen} closeMenu={closeMenu} menuItems={menuItems} />
      <DesktopNav menuItems={menuItems} />
    </NavigationWrapper>
  );
};

export default Navigation;