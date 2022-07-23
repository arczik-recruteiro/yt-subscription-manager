import { useState, useEffect, useCallback } from 'react';

import { GoogleAuthContextType, GoogleAuthContextUpdate } from 'Interfaces';

const GOOGLE_LOCAL_STORAGE_KEY = 'GOOGLE_LOCAL_STORAGE_KEY';

const useApp = () => {
  const [value, updateValue] = useState<GoogleAuthContextType>(null);

  const update: GoogleAuthContextUpdate = (input) => {
    if (typeof input !== 'undefined' && input !== null) {
      window.localStorage.setItem(
        GOOGLE_LOCAL_STORAGE_KEY,
        JSON.stringify(input)
      );
      updateValue(input);
    }
  };

  const loadFromLocalStorage = useCallback(() => {
    const localStorageGoogle = window.localStorage.getItem(
      GOOGLE_LOCAL_STORAGE_KEY
    );
    let parsed;

    if (
      typeof localStorageGoogle !== 'undefined' &&
      localStorageGoogle !== null
    ) {
      parsed = JSON.parse(localStorageGoogle);

      if (parsed.tokenObj.expires_at >= Date.now()) {
        updateValue(parsed);
      } else {
        window.localStorage.removeItem(GOOGLE_LOCAL_STORAGE_KEY);
        updateValue(null);
      }
    } else {
      updateValue(null);
    }
  }, []);

  const clear = () => {
    window.localStorage.removeItem(GOOGLE_LOCAL_STORAGE_KEY);
    updateValue(null);
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return { contextValue: { value, update, clear } };
};

export default useApp;
