# URL READER

This project helps you to read the content of URLs, and return the title, length, html, text, markdown, excerpt.

> "node": ">=20.11.0"

## Installation

```bash
yarn install urlreader
# or npm install urlreader
```

## Usage

```ts
import URLReader from 'urlreader';

const reader = new URLReader();
await reader.init();

const results = await reader.read({
  urls: ['https://www.google.com'],
  timeout: 10000, // ms, default: 60000
  enableMarkdown: false, // default: true
});
```

```ts
interface IReaderResult {
  title: string;
  length: number;
  html: string;
  text: string;
  markdown?: string;
  excerpt: string;
}
```

## Server

* start server

```bash
git clone https://github.com/yokingma/urlReader.git
cd urlReader

# default listen on port 3030
yarn run start
```

* api

```txt
GET /reader?url=https://www.google.com

POST /reader
{
  urls: ['https://www.google.com', 'https://www.bing.com']
}
```

## Docker

```bash
docker build -t urlreader .
```

## Tips

- puppeteer
When you install Puppeteer, it will automatically downloads a recent version of Chrome for Testing (~170MB macOS, ~282MB Linux, ~280MB Windows) and a chrome-headless-shell binary.

## Troubleshooting

- install error with puppeteer

```txt
Error [ERR_TLS_CERT_ALTNAME_INVALID]: Hostname/IP does not match certificate's altnames...
```

remove .npmrc file and re-install.
