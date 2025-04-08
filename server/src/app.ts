import express, {Express, NextFunction, RequestHandler} from 'express';
import { default as logger } from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { router as resellersRouter } from './routes/resellers';
import { router as usersRouter } from './routes/users';
import * as http from "node:http";

const PORT: number = 3001;
const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', resellersRouter);
app.use('/api', usersRouter);

const apiProxy: RequestHandler<http.IncomingMessage, http.ServerResponse, NextFunction> =
    createProxyMiddleware({
      target: `http://localhost:${PORT}/api'`,
      changeOrigin: true,
    });
const viteProxy: RequestHandler<http.IncomingMessage, http.ServerResponse, NextFunction> =
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
      ws: true,
    });
app.use('/api', apiProxy);
app.use(viteProxy);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})