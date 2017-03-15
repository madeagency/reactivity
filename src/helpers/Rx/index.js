import { Observable } from 'rxjs/Observable'

const passThrough = v => v

// type signature as per https://fetch.spec.whatwg.org/#fetch-method
export function fetchObservable(input, init, modifier = passThrough) {
  const result = fetch(input, init)
  const modifiedResult = result.then(modifier)
  return Observable.from(modifiedResult)
}

export function fetchJsonObservable(input, init) {
  const parseJson = response => response.json()
  return fetchObservable(input, init, parseJson)
}

export default {
  fetchObservable,
  fetchJsonObservable
}
