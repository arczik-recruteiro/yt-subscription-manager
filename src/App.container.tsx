import { FC } from 'react';

import useApp from 'Hooks/useApp';

import App from './App.component';

const AppContainer: FC = () => {
  const useAppProps = useApp();

  return <App {...useAppProps} />;
};

export default AppContainer;
