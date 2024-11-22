import { chunkHandler } from "./chunkHandler";
import { fetchEventSource } from "./fetchEventSource";
import { ISSEOption } from "./types";
import { DEFAUUT_RETRY_TIMEOUT } from "./defaults";

export async function fetchStream(url: string, options: ISSEOption) {
  let {
    onOpen,
    onEnd,
    onError,
    eventHandlers,
    method,
    body,
    headers,
    keepAlive,
    retryTimeout,
    abortController,
  } = options;
  retryTimeout ??= DEFAUUT_RETRY_TIMEOUT;
  try {
    const eventSourceObj = await fetchEventSource(
      url,
      method ?? "GET",
      body,
      headers,
      abortController
    );
    onOpen?.();
    const reader = eventSourceObj.body?.getReader();
    if (reader) await chunkHandler(reader, eventHandlers);
    onEnd?.();
  } catch (error) {
    if (keepAlive) {
      console.log("Error in SSE, retrying Connection: ", retryTimeout);
      setTimeout(() => fetchStream(url, options), retryTimeout);
    } else {
      onError?.(error);
    }
  }
}
