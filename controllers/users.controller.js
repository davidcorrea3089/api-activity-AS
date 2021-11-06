const User = require('../models/user.model')
const createError = require('http-errors')
const mailer = require('../config/mailer.config')

module.exports.create = (req, res, next) => {

    const body = {name, email, bio, password} = req.body

    User.create(body)
        .then(user => {
            mailer.sendValidationEmail(user)
            res.status(201).json(user)
        })
        .catch(next)

}

module.exports.login = (req, res, next) => {
    
    const {email, password} = req.body

    User.findOne({ email, active: true })
        .then(user => {
            if(user){
                user.checkPassword(password)
                    .then(match => {
                        if(match){
                            req.session.userId = user.id
                            res.json(user)
                        } else {
                            next(createError(404, 'User not found'))
                        }
                    })
                    .catch(next)
            } else {
                next(createError(404, 'User not found'))
            }
        })
        .catch(next)
}

module.exports.logout = (req, res, next) => {
    req.session.destroy()
    res.status(204).send()
}

module.exports.validate = (req, res, next) => {
      
    User.findByIdAndUpdate(req.params.id, { active: true }, { new: true })
        .then(User => {
            if(User){
                res.status(200).json(User)
            }else{
                next(createError(404), 'User not found')
            }
        })
        .catch(next)
}