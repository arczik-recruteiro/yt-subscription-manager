import { ReactNode } from 'react';

import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';

export type GoogleAuthContextType =
  | GoogleLoginResponse
  | GoogleLoginResponseOffline
  | null;

export interface GoogleAuthContextUpdate {
  (input?: GoogleAuthContextType): void;
}

export interface GoogleAuthContextTypeData {
  value: GoogleAuthContextType;
  update: GoogleAuthContextUpdate;
  clear: () => void;
}

export interface IGoogleSubscribedChannel {
  id: string;
  kind: string;
  etag: string;
  contentDetails: {
    activityType: string;
    newItemCount: number;
    totalItemCount: number;
  };
  snippet: {
    channelId: string;
    description: string;
    publishedAt: string;
    title: string;
    resourceId: {
      kind: string;
      channelId: string;
    };
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
}

export interface IGoogleSubscribedChannelsResponse {
  items: IGoogleSubscribedChannel[];
  etag: string;
  kind: string;
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export type AppReactChildren =
  | JSX.Element
  | JSX.Element[]
  | ReactNode
  | ReactNode[]
  | Element
  | Element[];
