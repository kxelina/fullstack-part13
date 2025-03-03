const router = require('express').Router()
const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
    const { userId, blogId } = req.body
    if (!userId || !blogId) {
        return res.status(400).json({ error: 'userId and blogId are required' })
    }
    const existing = await
        ReadingList.findOne({ where: { userId, blogId } })
    if (existing) {
        existing.read = req.body.read
        await existing.save()
        return res.json(existing)
    } else {
    const readingList = await ReadingList.create({ userId, blogId })
    res.status(201).json(readingList)
    }
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const { read } = req.body
    const readingList = await ReadingList.findByPk(req.params.id)
    if (readingList.userId === req.decodedToken.id) {
        readingList.read = read
        await readingList.save()
        res.json(readingList)
    } else {
        res.status(404).end()
    }
}
)

module.exports = router