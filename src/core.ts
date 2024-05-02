import { JSDOM } from 'jsdom';
import Turndown from 'turndown';
import puppeteer, { type Browser } from 'puppeteer';
import { Readability } from '@mozilla/readability';
import { IOptions, IReaderResult } from './interface';

class URLReaderError extends Error {};

export class URLReader {
  private browser: null | Browser;
  private timeout: number;
  private turndown: Turndown;

  constructor() {
    this.timeout = 60000;
    this.browser = null;
    this.turndown = new Turndown();
  }

  public async init() {
    if (this.browser) return;
    this.browser = await puppeteer.launch({
      headless: true,
    });
  }

  public async read(options: IOptions) {
    const { urls, timeout, enableMarkdown = true, runScripts } = options;
    const { browser, timeout: defaultTimeout } = this;
    if (!browser) throw new URLReaderError('browser is null.');
    const results: IReaderResult[] = [];
    for (const url of urls) {
      const page = await browser.newPage();
      const res = await page.goto(url, {
        timeout: timeout ?? defaultTimeout,
      });
      const txt = await res?.text();
      if (!txt) continue;

      const doc = new JSDOM(txt, {
        url,
        runScripts,
      });
      const article = await this.readDoc(doc.window.document);
      let markdown = '';
      if (enableMarkdown) markdown = await this.html2md(article?.content ?? '');
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

  private async readDoc(doc: Document) {
    const reader = new Readability(doc);
    return reader.parse();
  }

  private async html2md(html: string) {
    if (!html) return '';
    return this.turndown?.turndown(html);
  }
}

export default URLReader;
