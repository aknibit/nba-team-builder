import axios from 'axios';

export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeaders;
};

export async function get<T>(
  path: string
): Promise<T> {
  const { data } = await axios.get<T>(path);
  return data;
}

export async function put<T, TResponse>(
  path: string,
  payload: T
): Promise<TResponse> {
  const { data } = await axios.put<TResponse>(path, payload);
  return data;
}

export async function post<T, TResponse>(
  path: string,
  payload: T,
  config?: RequestConfig
): Promise<TResponse> {
  const response = config
    ? await axios.post<TResponse>(path, payload, config)
    : await axios.post<TResponse>(path, payload);
  return response.data;
}

export async function patch<T, TResponse>(
  path: string,
  payload: T
): Promise<TResponse> {
  const { data } = await axios.patch<TResponse>(path, payload);
  return data;
}
