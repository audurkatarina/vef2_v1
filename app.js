import path from 'path';
import express from 'express';

import {router} from './src/videos.js';
import {created, duration} from './src/help.js';

const app = express();

const viewsPath = new URL('./views', import.meta.url).pathname;

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.locals.setCreated = created;
app.locals.setDuration = duration;

app.use(express.static(new URL('./public', import.meta.url).pathname));

app.use('/', router);

/**
 * Middleware sem sér um 404 villur.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
function notFoundHandler(req, res, next) { // eslint-disable-line
    const title = 'Fannst ekki';
    const message = 'Ó nei, efnið finnst ekki!';
    res.status(404).render('error', { title, message });
}
  
/**
 * Middleware sem sér um villumeðhöndlun.
 *
 * @param {object} err Villa sem kom upp
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const title = 'Villa kom upp';
  const message = '';
  res.status(500).render('error', { title, message });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});