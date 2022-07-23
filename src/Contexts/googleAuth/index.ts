import { createContext } from 'react';

import { GoogleAuthContextTypeData } from 'Interfaces';

const googleAuthContext = createContext<GoogleAuthContextTypeData>({
  value: null,
  update: () => {},
  clear: () => {}
});

export default googleAuthContext;
