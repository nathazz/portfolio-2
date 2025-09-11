import axios from 'axios';
import { GITHUB_USERNAME } from '../utils/constants';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export interface IRepoResponse {
  name: string;
  id: number;
  html_url: string;
  description: string;
  language: string;
  topics: string[];
  homepage?: string;
}

export async function getRepos() {
  const { data } = await api.get<IRepoResponse[]>(`/users/${GITHUB_USERNAME}/repos`);

  const excludedRepoIds = [1019837821, 997002495, 745668491, 1037553560];

  return data.filter((repo) => !excludedRepoIds.includes(repo.id));
}

export interface IAvatarResponse {
  avatar_url: string;
}

export async function getAvatar() {
  const { data } = await api.get<IAvatarResponse>(`/users/${GITHUB_USERNAME}`);
  return data;
}
