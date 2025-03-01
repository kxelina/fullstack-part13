const router = require('express').Router()

const { Blog } = require('../models')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}


router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
    res.json(blog)
})

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        include: {
            model: User,
            attributes: ['username']
        }
    })
    console.log(JSON.stringify(blogs))
    res.json(blogs)
})

// router.post('/', async (req, res) => {
//     const user = await User.findOne()
//     const blog = await Blog.create({ ...req.body, userId: user.id })
//     res.json(blog)
// })

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
    if (blog && blog.userId === req.decodedToken.id) {
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