# sk-eventsource-polyfill

This library provides a convenient way to handle Server-Sent Events (SSE) with options to customize HTTP methods, request bodies, headers, and event handlers.

## Installation

```bash
npm install sk-eventsource-polyfill
```

## Exports

### Types
- `ISSEOption`: Interface for SSE options.
- `TEventHandlers`: Type for event handler functions.
- `TMethod`: HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).

### Functions
- `fetchStream(url: string, options: ISSEOption): Promise<void>`  
  Establishes an SSE connection to the specified URL.


## API Reference

### `fetchStream`

```typescript
fetchStream(url: string, options: ISSEOption): Promise<void>
```

#### Parameters

- `url`: `string`  
  The URL to connect to.

- `options`: `ISSEOption`  
  Configuration object:
  - `method`: `GET | POST`  
    HTTP method to use (default: `GET`).
  - `onOpen`: `() => void`  
    Callback for when the connection is successfully opened.
  - `onEnd`: `() => void`  
    Callback for when the connection is closed.
  - `eventHandlers`: `{ [event: string]: (data: string) => void }`  
    Handlers for specific events.
  - `onError`: `(error: Error) => void`  
    Callback for errors during the connection.
  - `body`: `object`  
    Data to send with the request (for `POST`).
  - `headers`: `{ [key: string]: string }`  
    Additional headers for the request.
  - `keepAlive`: `boolean`  
    Reconnect automatically on errors (default: `false`).
  - `retryTimeout`: `number`  
    Time (in ms) to wait before reconnecting (default: `5000`).
  - `abortController`: `AbortController`  
    Optional controller to cancel the request.

#### Stream Chunks

Each stream chunk consists of two lines at least:

- `event`: The name of the event.  
  Default value is `stream`.
- `data`: The data string associated with the event.

#### Usage Example

```javascript
import { fetchStream } from 'sk-eventsource-polyfill';

const eventHandlers = {
  stream: (data) => console.log('stream:', data),
};

fetchStream('https://example.com/events', {
  method: 'GET',
  onOpen: () => console.log('Connection opened'),
  onEnd: () => console.log('Connection closed'),
  onError: (error) => console.error('Error:', error),
  eventHandlers,
});
```