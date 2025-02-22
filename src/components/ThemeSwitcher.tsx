import React from 'react';

import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';


const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 24px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.notPreorderedColor};
  transition: 0.4s;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: ${(props) => props.theme.preorderedColor};
  }
`;

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleSwitch>
      <Input type="checkbox" onChange={toggleTheme} checked={theme.name === 'dark'}/>
      <Slider>
        {theme.name === 'light' ? 'Dark' : 'Light'}
      </Slider>
    </ToggleSwitch>
  );
};

export default ThemeSwitcher;