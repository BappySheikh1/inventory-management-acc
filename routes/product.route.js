const express = require('express')
const router = express.Router()
const productController= require('../controllers/product.controller')

router.route("/bulk-update").patch(productController.bulkUpdateProductById)
router.route("/bulk-delete").delete(productController.bulkDeleteProductById)


router.route('/')
.get(productController.getProduct)
.post(productController.createProduct)


router
.route("/:id")
.patch(productController.updateProductById) 
.delete(productController.deleteProductById)


module.exports = router