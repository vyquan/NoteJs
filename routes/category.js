import express from 'express';
import {create, list, read, update, remove, categoryById} from '../controllers/category';

const router = express.Router();

router.post('/categories', create);

router.get('/categories', list);

router.get('/category/:categoryId', read);

router.put('/category/:categoryId', update);

router.delete('/category/:categoryId', remove);
//Làm việc vs id
router.param('categoryId', categoryById);

module.exports = router;