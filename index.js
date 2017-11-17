const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const router = require('./router')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

app.listen(3000, () => {})