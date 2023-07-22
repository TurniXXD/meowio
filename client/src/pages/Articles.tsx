import { useTranslation } from 'react-i18next';

const Articles = () => {
  const { t } = useTranslation(['common', 'articles']);

  return (
    <div>
      <h1>{t('recentArticles')}</h1>
    </div>
  );
};

export default Articles;
