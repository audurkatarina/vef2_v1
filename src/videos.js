
import util from 'util';
import fs from 'fs';
import express from 'express';

export const router = express.Router();

const readFileAsync = util.promisify(fs.readFile);

/**
 * Higher-order fall sem umlykur async middleware með villumeðhöndlun.
 *
 * @param {function} fn Middleware sem grípa á villur fyrir
 * @returns {function} Middleware með villumeðhöndlun
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Les gögn async úr JSON skrá.
 *
 * @returns {object} Gögnum úr JSON skrá
 */
async function readList() {
  // hér væri líka hægt að gera bara `require('./lecrures.json')`  en sýnum
  // hvernig skjal lesið og JSON unnið
  const file = await readFileAsync('./videos.json');

  const json = JSON.parse(file);

  return json;
}

/**
 * Route handler sem birtir lista af myndböndum.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function list(req, res) {
  const title = 'Fræðslumyndbandaleiga';
  const json = await readList();
  const { videos } = json;
  //const {categories} = json.categories;

  res.render('videos', { title, videos });
}

/**
 * Route handler sem birtir myndband. Ef myndband finnst ekki í JSON skrá
 * er kallað í next() sem mun enda í 404 handler.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
async function video(req, res, next) {
  const { id } = req.params;

  const json = await readList();
  const { videos } = json;

  const foundVideo = videos.find(a => a.id === id);

  if (!foundVideo) {
    // sendum í 404 handler
    return next();
  }

  const { title } = foundVideo;

  return res.render('video', { title, video: foundVideo });
}

router.get('/', catchErrors(list));
router.get('/:id', catchErrors(video));

//module.exports = router;