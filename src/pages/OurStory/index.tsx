import React from "react";
import { PageWrapper, Title, Content} from "../../components/StyledComponets"
import { useTranslation } from 'react-i18next';

const OurStory: React.FC = () => {
  const { t } = useTranslation('ourstory');
  return (
    <PageWrapper>
      <Title>{t('ourStoryTitle')}</Title>
      <Content>
        <p>{t('ourStoryContent')}</p>
      </Content>
    </PageWrapper>
  )
}

export default OurStory;

