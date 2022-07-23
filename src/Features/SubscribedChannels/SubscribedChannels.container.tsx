import React, { FC } from 'react';

import SubscribedChannels from './SubscribedChannels.component';
import useSubscribedChannels from './hooks/useSubscribedChannels.hook';
import useDeleteSubscriptionItem from './hooks/useDeleteSubscriptionItem.hook';

const SubscribedChannelsContainer: FC = () => {
  const useSubscribedChannelsProps = useSubscribedChannels();
  const { isDeleting, deleteSubscriptionForEvent } =
    useDeleteSubscriptionItem();

  return (
    <SubscribedChannels
      {...useSubscribedChannelsProps}
      isDeleting={isDeleting}
      deleteSubscriptionForEvent={deleteSubscriptionForEvent}
    />
  );
};

export default SubscribedChannelsContainer;
