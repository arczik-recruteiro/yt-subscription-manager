import { useContext } from 'react';

import GoogleAuthContext from 'Contexts/googleAuth';

export interface IUseAuthData {
  isLogged: boolean;
}

const useAuthData = () => {
  const googleAuthContext = useContext(GoogleAuthContext);

  const isLogged =
    typeof googleAuthContext.value !== 'undefined' &&
    googleAuthContext.value !== null;

  return { isLogged };
};

export default useAuthData;
