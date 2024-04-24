# URL READER

This project allows you to read the content of a URL.

> "node": ">=20.0.0"

## Installation

```bash
yarn install urlreader
```

### Tips

- puppeteer
When you install Puppeteer, it automatically downloads a recent version of Chrome for Testing (~170MB macOS, ~282MB Linux, ~280MB Windows) and a chrome-headless-shell binary.

### Troubleshooting

- install error with puppeteer

```txt
Error [ERR_TLS_CERT_ALTNAME_INVALID]: Hostname/IP does not match certificate's altnames...
```

remove .npmrc file and reinstall.
