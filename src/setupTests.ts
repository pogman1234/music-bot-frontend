import '@testing-library/jest-dom'

(global as any).EventSource = class EventSource extends EventTarget {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSED = 2;

    url: string;
    readyState: number;
    onopen: ((this: EventSource, ev: Event) => any) | null;
    onmessage: ((this: EventSource, ev: MessageEvent) => any) | null;
    onerror: ((this: EventSource, ev: Event) => any) | null;
    withCredentials: boolean;

    constructor(url: string) {
      super();
      this.url = url;
      this.readyState = EventSource.CONNECTING;
      this.onopen = null;
      this.onmessage = null;
      this.onerror = null;
      this.withCredentials = false;
    }
  
    close() {
      this.readyState = EventSource.CLOSED;
    }

    addEventListener(_type: string, _listener: (this: EventSource, ev: Event) => any): void {
      // Implementation for addEventListener
    }

    removeEventListener(_type: string, _listener: (this: EventSource, ev: Event) => any): void {
      // Implementation for removeEventListener
    }

    dispatchEvent(_event: Event): boolean {
      // Implementation for dispatchEvent
      return false;
    }
  };

  (global as any).EventSource.CONNECTING = 0;
  (global as any).EventSource.OPEN = 1;
  (global as any).EventSource.CLOSED = 2;