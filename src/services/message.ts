import config from '../config';
import http from '../utils/http';
import SentMessage from '../domain/response/SentMessage';

export async function sendMessage(payload: SentMessage): Promise<SentMessage> {
  await http.post(config.apis.sendMessage, payload);

  return payload;
}
