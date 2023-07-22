import { useTranslation } from 'react-i18next';
import { tArray } from '../utils';

const About = () => {
  // TODO ta suspense pičovina je kvůli namespace, když jsou stejné nebo common, tak ok ale jakmile se tam namrdá jiný (mezi article about) tak jde do piče vše
  const { t } = useTranslation('about');

  return (
    <div>
      <h1>{t('title')}</h1>
      {tArray(t, 'description').map((paragraph) => (
        <p>{paragraph}</p>
      ))}
    </div>
  );
};

export default About;
