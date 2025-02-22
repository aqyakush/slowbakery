import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

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

export const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.hoverTextColor};
  }
`;

type DesktopNavProps = {
    menuItems: {
        to: string;
        label: string;
    }[];
};
const DesktopNav: React.FC<DesktopNavProps> = ({menuItems}) => {
  return (
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
  );
};

export default DesktopNav;