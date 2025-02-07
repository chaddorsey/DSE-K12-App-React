export interface IShareableContent {
  type: 'profile' | 'contact' | 'event' | 'link';
  title: string;
  data: Record<string, unknown>;
  url?: string;
}

export interface IShareOptions {
  methods: Array<'qr' | 'code' | 'url' | 'native'>;
  fallback?: boolean;
  timeout?: number;
} 