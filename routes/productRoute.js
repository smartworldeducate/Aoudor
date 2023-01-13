const express=require('express');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, AddtoWishlist, rating, uploadImages } = require('../controller/productCtrl');
const {isAdmin,authMiddleware} =require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');
const router=express.Router();


router.post('/',authMiddleware,createProduct,isAdmin)
router.post('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array('images', 10),
uploadImages)
router.get('/:id',getaProduct)
router.put('/wishlist',authMiddleware,AddtoWishlist)
router.put('/rating',authMiddleware,rating)
router.put('/:id',authMiddleware,updateProduct,isAdmin)
router.delete('/:id',authMiddleware,deleteProduct,isAdmin)
router.get('/',getAllProduct)

module.exports=router