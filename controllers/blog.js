const router = require('express').Router()

const { Blog } = require('../models')
const { User } = require('../models')
const { Op } = require('sequelize')
const { tokenExtractor } = require('../util/middleware')


router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
})

router.get('/', async (req, res) => {
    const where = {}

    if (req.query.search) {
        where[Op.or] = [
             {title: {[Op.substring]: req.query.search}},
             {author: {[Op.substring]: req.query.search}}
        ]
    }

    const blogs = await Blog.findAll({
        attributes: {exclude: ['userId', 'createdAt', 'updatedAt']},
        include: {
            model: User,
            attributes: ['name']
        },
        where,
        order: [['likes', 'DESC']]
    })
    console.log(JSON.stringify(blogs))
    res.json(blogs)
})


router.get('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        console.log(blog.toJSON())
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)    
    if (!blog) {
        return res.status(404).end()
    }
    if (blog.userId !== req.decodedToken.id) {
        return res.status(401).json({ error: 'unauthorized' })
    }
    if (blog.userId === req.decodedToken.id) {
        await Blog.destroy({
            where: {
                id: req.params.id
            }
    })
    res.status(204).end() 
    }
})

router.put('/:id', async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        blog.likes = req.body.likes 
        await blog.save()
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router