import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Article } from '../../data/blog';

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const ReadTime = styled.span`
  color: ${props => props.theme.secondaryColor};
  font-size: 0.9rem;
`;

interface BlogCardProps {
  article: Article;
}

const BlogCard: React.FC<BlogCardProps> = ({ article }) => (
  <Card to={`/blog/${article.slug}`}>
    <Image src={article.image} alt={article.title} />
    <Content>
      <Title>{article.title}</Title>
      <p>{article.excerpt}</p>
      <ReadTime>{article.readTime} min read</ReadTime>
    </Content>
  </Card>
);

export default BlogCard;