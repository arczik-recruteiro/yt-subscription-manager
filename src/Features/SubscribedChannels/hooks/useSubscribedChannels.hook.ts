import {
  useState,
  useEffect,
  useCallback,
  useContext,
  SyntheticEvent
} from 'react';
import { GoogleLoginResponse } from 'react-google-login';

import GoogleAuthContext from 'Contexts/googleAuth';
import {
  GoogleAuthContextTypeData,
  IGoogleSubscribedChannel,
  IGoogleSubscribedChannelsResponse
} from 'Interfaces';
import eventEmitter, { REFRESH_SUBSCRIPTIONS } from 'EventEmitter';

export interface IUseSubscribedChannels {
  error?: string;
  subscribedChannels?: IGoogleSubscribedChannel[] | null;
  loadData?: () => Promise<any>;
  loadDataWithEvent: (e?: SyntheticEvent) => void;
  isDataLoading?: boolean;
  fetchPrevPage: (e?: SyntheticEvent) => void | undefined;
  fetchNextPage: (e?: SyntheticEvent) => void | undefined;
  canLoadPrevPageData: boolean;
  canLoadNextPageData: boolean;
}

const fetchSubscriptions = (
  desiredToken: string,
  maxResults: number,
  pageToken?: string
) =>
  fetch(
    `${
      process.env.REACT_APP_GOOGLE_API_URL
    }/subscriptions?part=snippet&part=contentDetails&mine=true&maxResults=${maxResults}&key=${
      process.env.REACT_APP_GOOGLE_API_KEY
    }${!!pageToken ? '&pageToken=' + pageToken : ''}`,
    {
      headers: new Headers({
        Authorization: `Bearer ${desiredToken}`,
        Accept: 'application/json'
      })
    }
  );

const transform: (
  data: IGoogleSubscribedChannelsResponse,
  prevSubscribedChannels: IGoogleSubscribedChannel[] | null
) => IGoogleSubscribedChannel[] = (data, prevSubscribedChannels) => {
  // return data.items.reduce(
  //   (acc: IGoogleSubscribedChannel[], item: IGoogleSubscribedChannel) => {
  //     console.log('acc', acc);
  //     console.log('item', item);
  //     // do not push the very same result
  //     if (
  //       acc.findIndex(
  //         (desiredItem: IGoogleSubscribedChannel) => desiredItem.id === item.id
  //       ) === -1
  //     ) {
  //       acc.push(item);
  //     }

  //     return acc;
  //   },
  //   !!prevSubscribedChannels ? [...prevSubscribedChannels] : []
  // );

  return data.items;
};

const useSubscribedChannels = (): IUseSubscribedChannels => {
  const [subscribedChannels, setSubscribedChannels] = useState<
    IGoogleSubscribedChannel[] | null
  >(null);
  const [error, setError] = useState<string | undefined>();
  const [isDataLoading, setIsDataLoding] = useState<boolean>(false);
  const googleAuthContext =
    useContext<GoogleAuthContextTypeData>(GoogleAuthContext);
  const [maxResults, setMaxResults] = useState<number>(3);
  const [canLoadPrevPageData, setCanLoadPrevPageData] =
    useState<boolean>(false);
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>(
    undefined
  );
  const [canLoadNextPageData, setCanLoadNextPageData] =
    useState<boolean>(false);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );

  const loadData = useCallback(
    async (pageToken?: string) => {
      const tokenData = googleAuthContext.value as GoogleLoginResponse;
      const desiredToken = tokenData?.tokenObj?.access_token;

      setIsDataLoding(true);

      try {
        let response = await fetchSubscriptions(
          desiredToken,
          maxResults,
          pageToken
        );

        const data: IGoogleSubscribedChannelsResponse = await response.json();

        setPrevPageToken(data.prevPageToken);
        setCanLoadPrevPageData(typeof data.prevPageToken !== 'undefined');
        setNextPageToken(data.nextPageToken);
        setCanLoadNextPageData(typeof data.nextPageToken !== 'undefined');
        setSubscribedChannels(
          (
            prevSubscribedChannels: IGoogleSubscribedChannel[] | null
          ): IGoogleSubscribedChannel[] =>
            transform(data, prevSubscribedChannels)
        );

        setError(data.error ? data.error.message : undefined);
      } catch (e) {
        console.error(e);
      }

      setIsDataLoding(false);
    },
    [googleAuthContext.value]
  );

  const loadDataWithEvent = useCallback(
    (e?: SyntheticEvent) => {
      loadData();
    },
    [loadData]
  );

  const fetchPrevPage = useCallback(
    (e?: SyntheticEvent) => {
      if (typeof prevPageToken === 'undefined') {
        return;
      }

      loadData(prevPageToken);
    },
    [prevPageToken]
  );

  const fetchNextPage = useCallback(
    (e?: SyntheticEvent) => {
      if (typeof nextPageToken === 'undefined') {
        return;
      }

      loadData(nextPageToken);
    },
    [nextPageToken]
  );

  // initial data loading
  useEffect(() => {
    loadData();
  }, [loadData]);

  // componendDidMount
  useEffect(() => {
    eventEmitter.on(REFRESH_SUBSCRIPTIONS, loadData);

    // componentWillUnmount
    return () => {
      eventEmitter.removeListener(REFRESH_SUBSCRIPTIONS);
    };
  }, []);

  return {
    subscribedChannels,
    loadData,
    loadDataWithEvent,
    error,
    isDataLoading,
    fetchPrevPage,
    fetchNextPage,
    canLoadPrevPageData,
    canLoadNextPageData
  };
};

export default useSubscribedChannels;
