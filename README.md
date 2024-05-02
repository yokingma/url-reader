# URL READER

This project helps you to read the content of URLs, and return the title, length, html, text, markdown, excerpt.

> "node": ">=20.11.0"

## Installation

```bash
yarn install url-reader
# or npm install url-reader
```

## Usage

```ts
import URLReader from 'url-reader';

const reader = new URLReader();
await reader.init();

const results = await reader.read({
  urls: ['https://www.google.com'],
  timeout: 10000, // ms, default: 60000
  enableMarkdown: false, // default: true
  runScripts: 'dangerously', // run the scripts included in the HTML and fetch remote resources, default is closed.
});
```

Parsed Result:

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
git clone https://github.com/yokingma/url-reader.git
cd url-reader

# default listen on port 3030
yarn install & yarn run start
```

* api

```txt
GET /reader?url=https://www.google.com

POST /reader
Body:
{
  urls: ['https://www.google.com', 'https://www.bing.com']
}
```

## Docker

```bash
docker build -t urlreader . # urlreader is your image's tag name
```

The service will listen on port ```3030```.

## Tips

- puppeteer
When you install Puppeteer, it will automatically downloads a recent version of Chrome for Testing (~170MB macOS, ~282MB Linux, ~280MB Windows) and a chrome-headless-shell binary.

## Troubleshooting

- install error with puppeteer

```txt
Error [ERR_TLS_CERT_ALTNAME_INVALID]: Hostname/IP does not match certificate's altnames...
```

remove .npmrc file and re-install.
