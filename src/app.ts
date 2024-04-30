import * as Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3030);

console.log('[SERVER] started on port 3030.');
