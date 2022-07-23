import { useContext, useCallback, SyntheticEvent, useState } from 'react';
import { GoogleLoginResponse } from 'react-google-login';
import { toast } from 'react-toastify';

import { GoogleAuthContextTypeData } from 'Interfaces';
import GoogleAuthContext from 'Contexts/googleAuth';
import eventEmitter, { REFRESH_SUBSCRIPTIONS } from 'EventEmitter';

export interface IUseDeleteSubscriptionItem {
  deleteSusbcription?: (subscriptionId: string) => Promise<any> | Error;
  deleteSubscriptionForEvent?: (e: SyntheticEvent) => void;
  isDeleting?: boolean;
}

const useDeleteSubscriptionItem = () => {
  const googleAuthContext =
    useContext<GoogleAuthContextTypeData>(GoogleAuthContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteSusbcription = useCallback(
    async (subscriptionId: string) => {
      const tokenData = googleAuthContext.value as GoogleLoginResponse;
      const desiredToken = tokenData?.tokenObj?.access_token;

      setIsDeleting(true);

      try {
        await fetch(
          `${process.env.REACT_APP_GOOGLE_API_URL}/subscriptions?id=${subscriptionId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
          {
            headers: new Headers({
              Authorization: `Bearer ${desiredToken}`,
              Accept: 'application/json'
            }),
            method: 'DELETE'
          }
        );
      } catch (e) {
        console.error(e);
      }

      setIsDeleting(false);
    },
    [googleAuthContext.value]
  );

  const deleteSubscriptionForEvent = useCallback(
    async (e: SyntheticEvent) => {
      const subscriptionId: string | undefined = (e.target as HTMLElement)
        .dataset.subscriptionId;

      if (typeof subscriptionId !== 'undefined') {
        await deleteSusbcription(subscriptionId);
        toast.info('Subscription has been removed.');
        eventEmitter.emit(REFRESH_SUBSCRIPTIONS);
      } else {
        console.error('Invalid subscription id');
      }
    },
    [deleteSusbcription]
  );

  return { deleteSusbcription, deleteSubscriptionForEvent, isDeleting };
};

export default useDeleteSubscriptionItem;
