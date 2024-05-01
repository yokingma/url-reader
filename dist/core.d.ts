import { IOptions, IReaderResult } from './interface';
export declare class URLReader {
    private browser;
    private timeout;
    private turndown;
    constructor();
    init(): Promise<void>;
    read(options: IOptions): Promise<IReaderResult[]>;
    private readDoc;
    private html2md;
}
export default URLReader;
