import puppeteer, { type Browser } from 'puppeteer';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

interface IOptions {
  urls: string[]
  timeout: number
}

interface IReaderResult {
  title: string
  content: string
  length: number
  textContent: string
  excerpt: string
}

export class URLReader {
  private browser: null | Browser
  private timeout: number

  constructor() {
    this.timeout = 60000;
    this.browser = null;
  }

  public async init() {
    if (this.browser) return;
    this.browser = await puppeteer.launch();
  }

  public async read(options: IOptions) {
    const { urls, timeout } = options;
    const { browser, timeout: defaultTimeout } = this;
    if (!browser) throw new Error('browser is null');
    const results: IReaderResult[] = [];
    for (const url of urls) {
      const page = await browser.newPage();
      const res = await page.goto(url, {
        timeout: timeout || defaultTimeout
      })

      const txt = await res?.text();
      if (!txt) continue;
  
      const doc = new JSDOM(txt, {
        url
      });
      const reader = new Readability(doc.window.document);
      const article = reader.parse();
      if (article) {
        results.push({
          title: article.title,
          content: article.content,
          length: article.length,
          textContent: article.textContent,
          excerpt: article.excerpt
        })
      }

      await page.close()
    }

    return results;
  }
}
