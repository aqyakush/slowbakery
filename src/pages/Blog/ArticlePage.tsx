import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { articles } from '../../data/blog';

const ArticleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const ArticleTitle = styled.h1`
  margin-bottom: 1rem;
`;

const ArticleMeta = styled.div`
  color: ${props => props.theme.secondaryColor};
  margin-bottom: 2rem;
`;

const ArticleContent = styled.div`
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <ArticleContainer>
      <ArticleImage src={article.image} alt={article.title} />
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleMeta>{article.readTime} min read</ArticleMeta>
      <ArticleContent>{article.content}</ArticleContent>
    </ArticleContainer>
  );
};

export default ArticlePage;