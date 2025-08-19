const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function request<T>(method: string, endpoint: string, data?: any): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || 'API request failed');
  }
  
  if (response.status === 204) { // No Content
    return null as T;
  }

  return response.json();
}

export const http = {
  get: <T>(endpoint: string) => request<T>('GET', endpoint),
  post: <T>(endpoint: string, data: any) => request<T>('POST', endpoint, data),
  put: <T>(endpoint: string, data: any) => request<T>('PUT', endpoint, data),
  delete: <T>(endpoint: string) => request<T>('DELETE', endpoint),
};
