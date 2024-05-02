import { JSDOM } from 'jsdom';
import Turndown from 'turndown';
import puppeteer from 'puppeteer';
import { Readability } from '@mozilla/readability';
class URLReaderError extends Error {
}
;
export class URLReader {
    browser;
    timeout;
    turndown;
    constructor() {
        this.timeout = 60000;
        this.browser = null;
        this.turndown = new Turndown();
    }
    async init() {
        if (this.browser)
            return;
        this.browser = await puppeteer.launch({
            headless: true,
        });
    }
    async read(options) {
        const { urls, timeout, enableMarkdown = true } = options;
        const { browser, timeout: defaultTimeout } = this;
        if (!browser)
            throw new URLReaderError('browser is null.');
        const results = [];
        for (const url of urls) {
            const page = await browser.newPage();
            const res = await page.goto(url, {
                timeout: timeout ?? defaultTimeout,
            });
            const txt = await res?.text();
            if (!txt)
                continue;
            const doc = new JSDOM(txt, {
                url,
            });
            const article = await this.readDoc(doc.window.document);
            let markdown = '';
            if (enableMarkdown)
                markdown = await this.html2md(article?.content ?? '');
            if (article) {
                results.push({
                    length: article.length,
                    title: article.title,
                    html: article.content,
                    text: article.textContent,
                    markdown,
                    excerpt: article.excerpt,
                });
            }
            await page.close();
        }
        return results;
    }
    async readDoc(doc) {
        const reader = new Readability(doc);
        return reader.parse();
    }
    async html2md(html) {
        if (!html)
            return '';
        return this.turndown?.turndown(html);
    }
}
export default URLReader;
