export type ShareContentType = 'url' | 'image';

export interface IShareableContent {
  type: 'url' | 'text' | 'file';
  title: string;
  url?: string;
  description?: string;
  fileData?: Blob;
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