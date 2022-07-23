import React, { FC } from 'react';
import cx from 'classnames';

import { IGoogleSubscribedChannel } from 'Interfaces';
import { IUseSubscribedChannels } from './hooks/useSubscribedChannels.hook';
import { IUseDeleteSubscriptionItem } from './hooks/useDeleteSubscriptionItem.hook';
import {
  AppTable,
  AppTableTBody,
  AppTableTHead,
  AppTableTh,
  AppTableTd,
  AppTableTr
} from 'Components/AppTable';

interface ISubscribedChannels
  extends IUseSubscribedChannels,
    IUseDeleteSubscriptionItem {}

const SubscribedChannels: FC<ISubscribedChannels> = ({
  subscribedChannels,
  error,
  isDeleting,
  deleteSubscriptionForEvent,
  loadDataWithEvent,
  fetchPrevPage,
  fetchNextPage,
  canLoadPrevPageData,
  canLoadNextPageData
}) => (
  <div className="app-base-view">
    <h1 className="text-3xl">Subscribed Channels</h1>
    <button onClick={loadDataWithEvent} className="app-btn">
      load Data
    </button>

    {!!canLoadPrevPageData && (
      <button className="app-btn ml-1" onClick={fetchPrevPage}>
        fetch prev data page
      </button>
    )}
    {!!canLoadNextPageData && (
      <button className="app-btn ml-1" onClick={fetchNextPage}>
        fetch next data page
      </button>
    )}

    {error && <p>There is an error {error}</p>}
    {subscribedChannels && (
      <AppTable>
        <AppTableTHead>
          <AppTableTr>
            <AppTableTh>Title</AppTableTh>
            <AppTableTh></AppTableTh>
          </AppTableTr>
        </AppTableTHead>
        <AppTableTBody>
          {subscribedChannels?.map((sc: IGoogleSubscribedChannel) => (
            <AppTableTr key={sc.id} className="hover:bg-cyan-400">
              <AppTableTd className="p-2">
                <img
                  src={sc.snippet.thumbnails.default.url}
                  alt="Channel Thumbnail"
                />
              </AppTableTd>
              <AppTableTd>{sc.snippet.title}</AppTableTd>
              <AppTableTd>
                <button
                  className={cx(
                    'material-icons cursor-pointer hover:text-red-800',
                    { 'cursor-not-allowed': isDeleting }
                  )}
                  data-subscription-id={sc.id}
                  onClick={deleteSubscriptionForEvent}
                  disabled={isDeleting}
                >
                  delete_outline
                </button>
              </AppTableTd>
            </AppTableTr>
          ))}
        </AppTableTBody>
      </AppTable>
    )}
  </div>
);

export default SubscribedChannels;
