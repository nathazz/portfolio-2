import axios from "axios";

export interface IRepoResponse {
  name: string;
  id: number;
  html_url: string;
  description: string;
  language: string;
  topics: string[];
  homepage?: string;
}

const GITHUB_USERNAME = 'nathazz';

export async function getRepos() {
  const { data } = await axios.get<IRepoResponse[]>(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);

  const excludedRepoIds = [1019837821, 997002495, 745668491, 1037553560];

  return data.filter(repo => !excludedRepoIds.includes(repo.id))
}

export interface IAvatarResponse {
  avatar_url: string
}

export async function getAvatar(){
  const { data } = await axios.get<IAvatarResponse>(`https://api.github.com/users/${GITHUB_USERNAME}`);
  
  return data
}
 

