import { restClient } from '@massive.com/client-js';
import { API_BASE, API_KEY } from '@/constants';

export function createRestClient() {
  return restClient(API_KEY, API_BASE);
}
