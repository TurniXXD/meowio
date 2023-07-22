import { useTranslation } from 'react-i18next';

const LogIn = () => {
  const { t } = useTranslation(['common', 'login']);

  return (
    <div>
      <h1>{t('login')}</h1>
    </div>
  );
};

export default LogIn;
