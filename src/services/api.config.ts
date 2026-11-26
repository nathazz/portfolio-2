import axios, { type AxiosInstance } from 'axios';

export const bskyApi: AxiosInstance = axios.create({
  baseURL: 'https://public.api.bsky.app/xrpc',
  withCredentials: false,
  timeout: 10_000,
});
