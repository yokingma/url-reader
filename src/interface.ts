export interface IOptions {
  urls: string[];
  timeout?: number;
}

export interface IReaderResult {
  title: string;
  length: number;
  html: string;
  text: string;
  markdown?: string;
  excerpt: string;
}

export interface IRequestOptions {
  url?: string;
  urls?: string[];
  timeout?: number;
}
