import config from '../config';
import http from '../utils/http';
import LoginPayload from '../domain/misc/LoginPayload';
import { LoginResponse } from '../domain/states/Session';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await http.post(config.apis.login, payload);

  return data.data;
}
