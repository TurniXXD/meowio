import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from "./nav.module.scss";

const Nav = () => {
  const { t } = useTranslation('common');

  let isLoggedIn = true;

  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/">
          <img src="logo.png" alt="Meowio" height={50} width={50} />
        </Link>
        <Link to="/articles">{t('recentArticles')}</Link>
        <Link to="/">{t('about')}</Link>
      </div>

      {isLoggedIn ? (
        <div>
          <Link to="/my-articles">{t('myArticles')}</Link>
          <Link to="/create-article">{t('createArticle')}</Link>
        </div>
      ) : (
        <Link to="/login">{t('login')}</Link>
      )}
    </nav>
  );
};

export default Nav;
