const { tokenExtractor } = require('../util/middleware')
const  Session = require('../models/session')

const router = require('express').Router()

router.delete('/', tokenExtractor, async(req, res) => {
    const token = req.token
    await Session.destroy({
        where: {
            token
        }
    })
    res.status(204).end()
    }
)

module.exports = router