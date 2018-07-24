import store from '../store';
import * as pusher from '../utils/pusher';
import { messageReceived } from '../actions/messages';

const CHANNEL_NAME = 'chitchat-channel';
const MESSAGE_SENT_EVENT = 'message-sent';

/**
 * Subscribe to the channel and invoke binding function.
 */
export function initializePusher() {
  pusher.init();

  if (pusher.getPusherClient()) {
    pusher.subscribe(CHANNEL_NAME);

    initializeEventBinders();
  }
}

/**
 * Bind events to actions.
 */
function initializeEventBinders() {
  const channel = pusher.getPusherClient().channel(CHANNEL_NAME);

  channel.bind(MESSAGE_SENT_EVENT, (data: any) => {
    store.dispatch(messageReceived(data));
  });
}

/**
 * Unbind from all events and subscribe the channel.
 */
export function resetChannelSubscription() {
  if (pusher.getPusherClient()) {
    const channel = pusher.getPusherClient().channel(CHANNEL_NAME);

    if (channel) {
      channel.unbind_all();
    }

    pusher.unsubscribe(CHANNEL_NAME);
  }
}
