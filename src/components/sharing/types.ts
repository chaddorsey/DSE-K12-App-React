export type ShareContentType = 'url' | 'image';

export interface IShareableContent {
  type: ShareContentType;
  url?: string;
  title: string;
  imageUrl?: string;
}

export interface IShareMethod {
  id: string;
  label: string;
  icon: string;
  isAvailable: () => Promise<boolean>;
  share: (content: IShareableContent) => Promise<void>;
}

export interface IShareOptions {
  methods: Array<'qr' | 'code' | 'url' | 'native'>;
  fallback?: boolean;
  timeout?: number;
} 