import config from '../config';
import http from '../utils/http';
import { SentMessage } from '../domain/response/pusherResponse';

export async function sendMessage(message: string, timestamp: string): Promise<SentMessage> {
  const payload = {
    message,
    timestamp
  };
  await http.post(config.apis.sendMessage, payload);

  return payload;
}
