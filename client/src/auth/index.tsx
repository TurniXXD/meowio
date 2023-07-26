import { ReactNode, createContext, useContext, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { EnumCookies, useCookie } from './cookies';
import { GlobalService, LoginDto } from '../api';
import { initAxiosInstance } from '../api/config';
import { parseCookieExpirationSeconds } from '../auth/cookies';

export interface ILoginProps {
  username: string;
  password: string;
}

const AuthContext = createContext({
  authCookie: '',
  login: (data: LoginDto) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authCookie, setAuthCookie] = useCookie(EnumCookies.Auth, '');
  const navigate = useNavigate();

  const login = async (data: LoginDto) => {
    const res = await GlobalService.login({
      body: data,
    });
    if (!res?.access_token || !res?.expires_in || !res?.token_type) {
      throw new Error('login failed');
    }

    setAuthCookie(res?.access_token, {
      expires: parseCookieExpirationSeconds(res.expires_in),
    });
    initAxiosInstance(res?.access_token);
    navigate('/articles');
  };

  const logout = () => {
    setAuthCookie('');
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      authCookie,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authCookie]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authCookie } = useAuth();

  if (!authCookie) {
    return <Navigate to="/login" />;
  }
  return children;
};
