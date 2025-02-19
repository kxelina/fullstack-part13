const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs))
    res.json(blogs)
})

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
    res.json(blog)
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

router.delete('/:id', async (req, res) => {
    await Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(204).end()
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