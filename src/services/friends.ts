import config from '../config';
import http from '../utils/http';
import { interpolate } from '../utils/string';
import Friend from '../domain/response/Friend';

export async function fetchFriends(userId: number): Promise<Friend[]> {
  const url = interpolate(config.apis.fetchFriends, { userId });
  const { data } = await http.get(url);

  return data.data;
}
