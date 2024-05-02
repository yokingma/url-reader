export interface IOptions {
    urls: string[];
    enableMarkdown?: boolean;
    runScripts?: 'dangerously' | 'outside-only';
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
