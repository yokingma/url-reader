import Fastify from 'fastify';
import { URLReader } from './core.js';
const PORT = 3030;
const reader = new URLReader();
await reader.init();
const app = Fastify({
    logger: true,
});
app.get('/', async (req, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});
app.get('/reader', async (req, reply) => {
    const { url } = req.query;
    if (!url)
        return [];
    const res = await reader.read({ urls: [url] });
    reply.type('application/json').code(200);
    return res;
});
app.post('/reader', async (req, reply) => {
    const { urls = [], url } = req.body;
    if (!urls && !url)
        return [];
    if (url)
        urls.push(url);
    const res = await reader.read({ urls });
    reply.type('application/json').code(200);
    return res;
});
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        app.log.error(err);
        throw err;
    }
    app.log.info(`[SERVER] address: ${address}`);
    app.log.info(`[SERVER] started on port: ${PORT}`);
});
