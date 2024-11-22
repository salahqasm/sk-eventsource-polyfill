import { TEventHandlers } from "./types";
import { unhandledEvent } from "./defaults";

export async function chunkHandler(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  eventHandlers?: TEventHandlers
) {
  const decoder = new TextDecoder();
  let buffer = "";
  let message = { event: "", data: "" };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let lineEndIndex;
    while ((lineEndIndex = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, lineEndIndex).trim();
      buffer = buffer.slice(lineEndIndex + 1);
      if (line === "") {
        if (message.event) {
          if (eventHandlers?.[message.event]) {
            eventHandlers[message.event](message.data);
          } else {
            unhandledEvent(message.event, message.data);
          }
        }
        message = { event: "", data: "" };
      } else if (line.startsWith("event:")) {
        message.event = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        message.data += (message.data ? "\n" : "") + line.slice(5).trim();
      }
    }
  }
  if (buffer.trim() && message.event) {
    message.data += buffer.trim();
    if (eventHandlers?.[message.event]) {
      eventHandlers[message.event](message.data);
    } else {
      unhandledEvent(message.event, message.data);
    }
  }
}
