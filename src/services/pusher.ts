import store from '../store';
import * as pusher from '../utils/pusher';
import { messageReceived } from '../actions/messages';

// const CHANNEL_NAME = 'chitchat-channel';
const MESSAGE_SENT_EVENT = 'message-sent';

/**
 * Subscribe to the channel and invoke binding function.
 */
export function initializePusher() {
  pusher.init();
}

export function initializeChannel(channelName: string) {
  resetChannelSubscriptions();

  if (pusher.getPusherClient()) {
    pusher.subscribe(channelName);

    initializeEventBinders(channelName);
  }
}

/**
 * Bind events to actions.
 */
function initializeEventBinders(channelName: string) {
  const channel = pusher.getPusherClient().channel(channelName);

  channel.bind(MESSAGE_SENT_EVENT, (data: any) => {
    store.dispatch(messageReceived(data));
  });
}

/**
 * Unbind from all events and subscribe the channel.
 */
export function resetChannelSubscriptions() {
  const client = pusher.getPusherClient();

  if (client) {
    client.allChannels().forEach(channel => {
      channel.unbind_all();
      pusher.unsubscribe(channel.name);
    });
  }
}
