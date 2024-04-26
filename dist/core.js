import puppeteer from 'puppeteer';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
class URLReaderError extends Error {
}
;
export class URLReader {
    browser;
    timeout;
    constructor() {
        this.timeout = 60000;
        this.browser = null;
    }
    async init() {
        if (this.browser)
            return;
        this.browser = await puppeteer.launch();
    }
    async read(options) {
        const { urls, timeout } = options;
        const { browser, timeout: defaultTimeout } = this;
        if (!browser)
            throw new URLReaderError('browser is null.');
        const results = [];
        for (const url of urls) {
            const page = await browser.newPage();
            const res = await page.goto(url, {
                timeout: timeout || defaultTimeout,
            });
            const txt = await res?.text();
            if (!txt)
                continue;
            const doc = new JSDOM(txt, {
                url,
            });
            const reader = new Readability(doc.window.document);
            const article = reader.parse();
            if (article) {
                results.push({
                    title: article.title,
                    content: article.content,
                    length: article.length,
                    textContent: article.textContent,
                    excerpt: article.excerpt,
                });
            }
            await page.close();
        }
        return results;
    }
}
