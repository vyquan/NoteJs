import express from 'express';
import {list, create, newsById, read, remove, update} from '../controllers/news';

const router = express.Router();

router.post('/news', create);

router.get('/news', list);

router.get('/news/:newsId', read);

router.put('/news/:newsId', update);

router.delete('/news/:newsId', remove);

router.param('newsId', newsById);

module.exports = router;