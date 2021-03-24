import express from 'express';
import {list, create, productById, read, remove, update} from '../controllers/product';

const router = express.Router();

router.post('/products', create);

router.get('/products', list);

router.get('/product/:productId', read);

router.put('/product/:productId', update);

router.delete('/product/:productId', remove);

router.param('productId', productById);

module.exports = router;