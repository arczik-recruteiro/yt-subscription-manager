import React, { FC } from 'react';

import { IUseAuthData } from 'Hooks/useAuthData';

interface ILandingPage extends IUseAuthData {}

const LandingPage: FC<ILandingPage> = ({ isLogged }) => {
  if (isLogged) {
    return (
      <div className="app-base-view">
        <h1 className="text-3xl my-4">Youtube Manager</h1>
        <p className="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    );
  } else {
    return (
      <div className="app-base-view text-2xl">
        <h2>Please use login button</h2>
      </div>
    );
  }
};

export default LandingPage;
