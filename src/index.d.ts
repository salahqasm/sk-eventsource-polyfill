import { ISSEOption, TEventHandlers, TMethod } from "./lib/types";
export { ISSEOption, TEventHandlers, TMethod };

/**
 * @param url - URL to connect to
 * @param options - {method, onOpen, onEnd, eventHandlers, onError, body, headers, keepAlive, retryTimeout, abortController}
 * @param options.method - HTTP method = GET | POST
 * @param options.onOpen - Callback function to be called when connection is opened
 * @param options.onEnd - Callback function to be called when connection is closed
 * @param options.eventHandlers - Event handlers for different events
 * @param options.onError - Callback function to be called when error occurs
 * @param options.body - Body to be sent in the request
 * @param options.headers - Headers to be sent in the request
 * @param options.keepAlive - Boolean to keep trying to connect again - default is false
 * @param options.retryTimeout - Time to wait before retrying connection - default is 5000ms
 * @param options.abortController - AbortController to abort the connection
 */

export function fetchStream(url: string, options: ISSEOption): Promise<void>;
