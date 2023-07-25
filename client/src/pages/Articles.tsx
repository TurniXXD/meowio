import { useTranslation } from 'react-i18next';

const articles = [
  {
    title: 'article 1',
  },
  {
    title: 'article 2',
  },
  {
    title: 'article 3',
  },
  {
    title: 'article 4',
  },
];

const Articles = () => {
  const { t } = useTranslation(['common', 'articles']);

  return (
    <div>
      <h1>{t('recentArticles')}</h1>
      {articles.map((article, i) => (
        <div key={i}>{article.title}</div>
      ))}
    </div>
  );
};

export default Articles;
