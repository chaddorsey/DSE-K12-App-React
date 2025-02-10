interface VisualViewportEventMap {
  'resize': Event;
  'scroll': Event;
}

interface VisualViewport extends EventTarget {
  readonly height: number;
  readonly width: number;
  readonly offsetTop: number;
  readonly offsetLeft: number;
  readonly pageTop: number;
  readonly pageLeft: number;
  readonly scale: number;
  
  addEventListener<K extends keyof VisualViewportEventMap>(
    type: K,
    listener: (this: VisualViewport, ev: VisualViewportEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  
  removeEventListener<K extends keyof VisualViewportEventMap>(
    type: K,
    listener: (this: VisualViewport, ev: VisualViewportEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}

interface Window {
  visualViewport?: VisualViewport;
} 