import { useTranslation } from 'react-i18next';

const Article = () => {
  const { t } = useTranslation('articles');

  return (
    <div>
      {t('relatedArticles')}
    </div>
  );
};

export default Article;
