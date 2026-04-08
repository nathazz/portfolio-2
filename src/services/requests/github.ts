import axios from 'axios';
import { GITHUB_USERNAME } from '../../utils/constants';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export interface IAvatarResponse {
  avatar_url: string;
}

export async function getAvatar() {
  const { data } = await api.get<IAvatarResponse>(`/users/${GITHUB_USERNAME}`);
  return data;
}
