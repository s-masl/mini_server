const Products = require('../../../models/products')
const {Router} = require('express')
const multer  = require('multer')


const router = Router()

const storageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './src/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({storage: storageEngine})


// Upload data
router.post('/upload', upload.single("image"), async (req, res) => {
    try {
        let image = req.file
        const result = await Products.findByIdAndUpdate(req.query.id, {image: image.filename}, {new: true})
        if(!image)
            res.status(400).send('Error loading file');
        else
            res.status(200).json(result)
    } catch (err) {
        res.status(400).send(err)
        console.log(err.message)
    }

})

module.exports = router