import Koa from 'koa';
import connectorInit from './connectors';
import initHandlers from './handlers';
import modules from './modules';

connectorInit();

const app = new Koa();

initHandlers(app);
app.use(modules);

app.use(async (ctx) => {
    ctx.body = '<h1>Summary</h1>';
});

export default app;
