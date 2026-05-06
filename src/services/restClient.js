import { restClient } from '@massive.com/client-js';

const API_BASE = 'https://api.massive.com';
const API_KEY = 'G8XpDTrOCsNbQJopzJVyBGyzJLsWYtP9';

export function createRestClient() {
  return restClient(API_KEY, API_BASE);
}
