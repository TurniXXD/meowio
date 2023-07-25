import { useTranslation } from 'react-i18next';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <h1>{t('login')}</h1>
      <LoginForm t={t} />
    </div>
  );
};

export default Login;
