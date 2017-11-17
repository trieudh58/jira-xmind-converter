const express = require('express')

const { renderIndex, downloadXmind } = require('./handler')

const router = express.Router()

router.get('/', renderIndex)
router.post('/xmind/download', downloadXmind)

module.exports = router
