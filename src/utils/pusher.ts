import * as PusherClient from 'pusher-js';

import config from '../config';

let pusherClient: PusherClient.Pusher;

export function init() {
  const { key, cluster } = config.pusher;

  pusherClient = new PusherClient(key, {
    cluster
  });
}

/**
 * Get the instance of the Pusher.
 *
 * @returns {PusherClient.Pusher}
 */
export function getPusherClient(): PusherClient.Pusher {
  return pusherClient;
}

/**
 * Subscribe to a given channel name.
 *
 * @param {string} channelName
 */
export function subscribe(channelName: string) {
  if (pusherClient) {
    pusherClient.subscribe(channelName);
  }
}

/**
 * Unsubscribe from a given channel.
 *
 * @param {string} channelName
 */
export function unsubscribe(channelName: string) {
  if (pusherClient) {
    pusherClient.unsubscribe(channelName);
  }
}

/**
 * Disconnect from Pusher.
 */
export function disconnect() {
  if (pusherClient) {
    pusherClient.disconnect();
  }
}
