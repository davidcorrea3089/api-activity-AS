const Post = require('../models/post.model')
const createError = require('http-errors')

module.exports.list = (req, res, next) => {
    
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next)

}

module.exports.create = (req, res, next) => {
    
    const body = { title, text, author, image} = req.body
    
    if(req.file) {
        body.image = req.file.path
    }

    Post.create(body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    
    Post.findById(req.params.id)
        .then(Post => {
            if(Post){
                res.status(200).json(Post)
            }else{
                next(createError(404), 'Post not found')
            }
        })
        .catch(next)

}

module.exports.update = (req, res, next) => {

    const body = { title, text, author} = req.body
    
    Post.findByIdAndUpdate(req.params.id, body, { new: true })
        .then(Post => {
            if(Post){
                res.status(200).json(Post)
            }else{
                next(createError(404), 'Post not found')
            }
        })
        .catch(next)

}

module.exports.delete = (req, res, next) => {
    
    Post.findByIdAndDelete(req.params.id)
        .then((Post) => {
            if(Post){
                res.status(204).send()
            }else{
                next(createError(404), 'Post not found')
            }
        })
        .catch(next)

}