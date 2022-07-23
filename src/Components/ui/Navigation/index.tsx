import { FC, useContext, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout
} from 'react-google-login';

import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import GoogleAuthContext from 'Contexts/googleAuth';

const Navigation: FC = () => {
  const googleAuthContext = useContext(GoogleAuthContext);

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    googleAuthContext.update(response);
  };

  const onFailure = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    console.error('onFailure', response);
    googleAuthContext.update(null);
  };

  const onLogoutSuccess = () => {
    googleAuthContext.clear();
  };

  const WrappedLoginButton = useCallback(
    ({
      onClick,
      disabled
    }: {
      onClick: () => void;
      disabled?: boolean | undefined;
    }) => {
      return <LoginButton onClick={onClick} disabled={disabled} />;
    },
    []
  );

  const WrapperLogoutButton = useCallback(
    ({
      onClick,
      disabled
    }: {
      onClick: () => void;
      disabled?: boolean | undefined;
    }) => {
      return <LogoutButton onClick={onClick} disabled={disabled} />;
    },
    []
  );

  const isLogged =
    typeof googleAuthContext.value !== 'undefined' &&
    googleAuthContext.value !== null;

  return (
    <nav className="app-navigation">
      <h3 className="text-4xl">Youtube Manager</h3>
      <div className="flex justify-between">
        {isLogged && (
          <>
            <NavLink className="app-nav-link shrink-0 grow-0" to="/">
              Home
            </NavLink>

            <NavLink
              className="app-nav-link shrink-0 grow-0"
              to="/subscribed-channels"
            >
              Subscribed Channels
            </NavLink>

            <div className="basis-1 shrink-1 grow-1" />
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_APP_CLIENT_ID as string}
              onLogoutSuccess={onLogoutSuccess}
              render={WrapperLogoutButton}
              className="shrink-0 grow-0"
            />
          </>
        )}

        {!isLogged && (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_APP_CLIENT_ID as string}
            onSuccess={onSuccess}
            onFailure={onFailure}
            scope={process.env.REACT_APP_GOOGLE_YOUTUBE_SCOPES}
            render={WrappedLoginButton}
          />
        )}
      </div>
    </nav>
  );
};

export default Navigation;
