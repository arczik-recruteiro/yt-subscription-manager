import React from 'react';

import LandingPage from './LandingPage.component';

import useAuthData from 'Hooks/useAuthData';

const LandingPageContainer = () => {
  const useAuthDataProps = useAuthData();

  return <LandingPage {...useAuthDataProps} />;
};

export default LandingPageContainer;
