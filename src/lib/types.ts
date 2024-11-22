export type TMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ISSEOption {
  method?: TMethod;
  body?: object;
  headers?: { [key: string]: string };
  onOpen?: () => void;
  onEnd?: () => void;
  onError?: (error?: any) => void;
  eventHandlers?: TEventHandlers;
  keepAlive?: boolean;
  retryTimeout?: number;
  abortController?: AbortController;
}

export type TEventHandlers = {
  [key: string]: (data: any) => void;
};

