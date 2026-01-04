const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    seedProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.route('/').get(getProducts).post(createProduct);
console.log('Mounting /seed route');
router.route('/seed').post(seedProducts);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
