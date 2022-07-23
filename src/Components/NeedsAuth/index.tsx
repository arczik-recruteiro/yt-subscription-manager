import { FC, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import GoogleAuthContext from 'Contexts/googleAuth';
import { GoogleAuthContextTypeData } from 'Interfaces';

interface INeedsAuth {
  children: JSX.Element;
}

const NeedsAuth: FC<INeedsAuth> = ({ children }) => {
  const googleAuthContext =
    useContext<GoogleAuthContextTypeData>(GoogleAuthContext);
  const isLogged =
    typeof googleAuthContext.value !== 'undefined' &&
    googleAuthContext.value !== null;

  let location = useLocation();

  if (!isLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default NeedsAuth;
