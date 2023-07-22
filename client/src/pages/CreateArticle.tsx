import { useTranslation } from 'react-i18next';

const CreateArticle = () => {
  const { t } = useTranslation('articles');

  return (
    <div>
      <h1>{t('createNewArticle')}</h1>
    </div>
  );
};

export default CreateArticle;
