const PORT = process.env.PORT || 3000
const express = require('express')
const mongoose = require('mongoose')
const api = require('./api/api')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api', api)


async function start() {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/store',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        )
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT} ...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()