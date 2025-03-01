const router = require('express').Router()

const { Blog } = require('../models')
const { Sequelize } = require('sequelize')

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: ['author',
            [Sequelize.fn('count', Sequelize.col('author')), 'blogs'],
            [Sequelize.fn('sum', Sequelize.col('likes')), 'likes']
        ],
        group: ['author']
    })
    res.json(authors)
})

module.exports = router