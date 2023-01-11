const express=require('express');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, AddtoWishlist } = require('../controller/productCtrl');
const {isAdmin,authMiddleware} =require('../middlewares/authMiddleware')
const router=express.Router();


router.post('/',authMiddleware,createProduct,isAdmin)
router.get('/:id',getaProduct)
router.put('/wishlist',authMiddleware,AddtoWishlist)
router.put('/:id',authMiddleware,updateProduct,isAdmin)
router.delete('/:id',authMiddleware,deleteProduct,isAdmin)
router.get('/',getAllProduct)

module.exports=router