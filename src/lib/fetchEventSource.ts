import { TMethod } from "./types";

export async function fetchEventSource(
  url: string,
  method: TMethod,
  body?: object,
  headers?: { [key: string]: string },
  abortController?: AbortController
) {
  const response = await fetch(url, {
    method,
    signal: abortController?.signal,
    ...(body && { body: JSON.stringify(body) }),
    ...(headers && { headers }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
}
