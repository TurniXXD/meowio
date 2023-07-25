import { TFunction } from 'i18next';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../auth';
import { useTranslation } from 'react-i18next';
import { EnumCookies, useCookie } from '../../auth/cookies';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ t: tCommon }: { t: TFunction }) => {
  const { login } = useAuth();
  const { t } = useTranslation('login');
  const [cookie] = useCookie(EnumCookies.Auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ cookie });
    if (cookie) {
      navigate('/articles');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    try {
      login({
        // There was email field in figma but username in openapi docs, so i just used username
        username: data.email,
        password: data.password,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>{tCommon('email')}</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: t('emailRequired'),
            pattern: { value: /^\S+@\S+$/i, message: t('emailInvalid') },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder={t('emailPlaceholder')}
            />
          )}
        />
        {/* {errors.email && <span>{errors.email.message}</span>} */}
      </div>

      <div>
        <label>{tCommon('password')}</label>
        <Controller
          name="password"
          control={control}
          rules={{ required: t('passwordRequired') }}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              placeholder={t('passwordPlaceholder')}
            />
          )}
        />
        {/* {errors.password && <span>{errors.password.message}</span>} */}
      </div>

      <button type="submit">{tCommon('login')}</button>
    </form>
  );
};

export default LoginForm;
