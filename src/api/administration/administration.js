const Products = require('../../models/products')
const uploads = require('./uploads/uploads')
const directory = require('../../uploads/uploads')
const {Router} = require('express')
const path = require('path')
const fs = require('fs')

const router = Router()

router.use('/', uploads)

// Add new product
router.post('/add', async (req, res) => {
    try {
        const product = new Products(req.body)
        await product.save()
        res.status(201).send('Created')
    } catch (err) {
        res.status(400).send(err)
        console.log(err.message)
    }
})

// Delete product
router.delete('/delete', async (req, res) => {
    const product = await Products.findById(req.body.id)
    await Products.findByIdAndDelete(req.body.id, (err) => {
        if (!err) {
            res.status(204).send('No content')
        } else {
            console.log(err)
        }
        try {
            fs.unlink(path.join(directory, product.image), () => {
            })
        } catch {
        }
    })
})

// Edit product
router.patch('/edit', async (req, res) => {
    try {
        const result = await Products.findByIdAndUpdate(req.query.id, req.body, {new: true})
        res.status(200).json(result)
    } catch (err) {
        res.status(400).send(err)
        console.log(err.message)
    }
})


module.exports = router

