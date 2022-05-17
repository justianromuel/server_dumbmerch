const express = require('express')
const router = express.Router()

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { addProduct, getProduct, getDetailProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { addTransaction, getTransactions, notification } = require('../controllers/transaction')
const { addCategory, getCategory, getDetailCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { register, login, checkAuth } = require('../controllers/auth')
const { getProfile } = require("../controllers/profile");

// Middleware
const { auth } = require('../middlewares/auth')
// Upload File
const { uploadFile } = require('../middlewares/uploadFile')

// Route
// User
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// Profile
router.get('/profile', auth, getProfile)

// Product
router.post('/product', auth, uploadFile("image"), addProduct)
router.get('/products', auth, getProduct)
router.get('/product/:id', auth, getDetailProduct)
router.patch('/product/:id', auth, uploadFile("image"), updateProduct)
router.delete('/product/:id', auth, deleteProduct)

// Transaction
router.post('/transaction', auth, addTransaction)
router.get('/transactions', auth, getTransactions)

// Notification
router.post('/notification', notification)

// Category
router.post('/category', addCategory)
router.get('/categories', getCategory)
router.get('/category/:id', getDetailCategory)
router.patch('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)

// Auth
router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);

module.exports = router