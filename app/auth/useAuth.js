import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import authStorage from './storage';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = async (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logout = () => {
    setUser(null);
    authStorage.removeToken();
  };
  return { user, logout, login };
};

export default useAuth;
