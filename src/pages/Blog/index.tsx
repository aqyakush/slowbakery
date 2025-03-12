import React from 'react';
import styled from 'styled-components';
import BlogCard from './BlogCard';
import { articles } from '../../data/blog';
import { PageWrapper, Title } from '../../components/StyledComponets';
import { useTranslation } from 'react-i18next';

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const NAMESPACE = 'blog';

const Blog: React.FC = () => {
  const { t } = useTranslation(NAMESPACE);
  return (
    <PageWrapper>
      <Title>{t('blogTitle')}</Title>
      <BlogGrid>
        {articles.map(article => (
          <BlogCard key={article.id} article={article} />
        ))}
      </BlogGrid>
    </PageWrapper>
  );
};

export default Blog;