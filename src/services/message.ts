import config from '../config';
import http from '../utils/http';
import { interpolate } from '../utils/string';
import SentMessage from '../domain/response/SentMessage';

export async function getMessages(friendshipId: number): Promise<SentMessage[]> {
  const url = interpolate(config.apis.getChatMessages, { friendshipId });
  const { data } = await http.get(url);

  return data.data;
}

export async function sendMessage(payload: SentMessage): Promise<SentMessage> {
  await http.post(config.apis.sendMessage, payload);

  return payload;
}
