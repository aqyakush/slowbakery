import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const LanguageDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LanguageButton = styled.button<{ selected: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${({ selected }) => (selected ? '#92400e' : '#666')}; /* Match other colors */
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.hoverTextColor}; /* Match hover color */
  }

  &:focus {
    outline: none;
  }
`;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation('navigation');
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };
    
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <LanguageDiv>
      <LanguageButton
        onClick={() => changeLanguage('fi')}
        selected={i18n.language === 'fi'}
      >
            FI
      </LanguageButton>
      <span>/</span>
      <LanguageButton
        onClick={() => changeLanguage('en')}
        selected={i18n.language === 'en'}
      >
            EN
      </LanguageButton>
    </LanguageDiv>
  );
};

export default LanguageSwitcher;