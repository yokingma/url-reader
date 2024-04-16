interface IOptions {
    urls: string[];
    timeout: number;
}
interface IReaderResult {
    title: string;
    content: string;
    length: number;
    textContent: string;
    excerpt: string;
}
export declare class URLReader {
    private browser;
    private timeout;
    constructor();
    init(): Promise<void>;
    read(options: IOptions): Promise<IReaderResult[]>;
}
export {};
