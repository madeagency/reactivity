import { apiUrl, parseJson } from './shared'

export function getUsers() {
  return fetch(`${apiUrl}/people`).then(parseJson)
}

export default {
  getUsers
}
