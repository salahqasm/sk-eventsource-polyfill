export const DEFAUUT_RETRY_TIMEOUT = 5000;

export function unhandledEvent(event: string, data: any) {
  console.log(`Unhandled event from SSE: ${event} with data: ${data}`);
}

