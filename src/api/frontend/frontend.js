const Products = require('../../models/products')
const {Router} = require('express')

const router = Router()

// Get all
router.get('/all', async (req, res) => {
    const {page, perPage} = req.query

    const products = await Products.find()
        .limit(+perPage || 10)
        .skip((+perPage * +page) || 0)
    res.status(200).json(products)
})

//Get by name
router.get('/name', async (req, res) => {
    const {page, perPage, name} = req.query

    const products = await Products.find({name})
        .limit(+perPage || 10)
        .skip((+perPage * +page) || 0)
    res.status(200).json(products)
})

//Get by max price
router.get('/price', async (req, res) => {
    const {page, perPage, price} = req.query

    const products = await Products.find({price: { $lt: +price }})
        .limit(+perPage || 10)
        .skip((+perPage * +page) || 0)
    res.status(200).json(products)
})

//Get in stock
router.get('/in_stock', async (req, res) =>{
    const {page, perPage} = req.query

    const products = await Products.find({lost: { $gt: 0 }})
        .limit(+perPage || 10)
        .skip((+perPage * +page) || 0)
    res.status(200).json(products)
})

// Get one product
router.get('/product', async (req, res) => {
    try {
        const product = await Products.findById(req.query.id)
        res.status(200).json(product)
    } catch (e) {
        res.status(404).json()
        console.log(e.message)
    }
})

module.exports = router
