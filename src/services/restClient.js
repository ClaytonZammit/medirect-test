import { restClient } from '@massive.com/client-js';

const API_BASE = 'https://api.massive.com';

export function createRestClient() {
  return restClient(process.env.VUE_APP_API_KEY, API_BASE);
}
