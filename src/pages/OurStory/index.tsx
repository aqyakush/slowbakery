import { PageWrapper, Title, Content} from "../../components/StyledComponets"
import { useTranslation } from 'react-i18next';

export default function OurStory() {
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

