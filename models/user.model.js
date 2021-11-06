const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const PASSWORD_PATTERN = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: EMAIL_PATTERN,
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: PASSWORD_PATTERN
    },
    bio: {
        type: String,
        maxlength: 200
    },
    active: {
        type: Boolean,
        default: false
    },
    createdAt: Date,
    updatedAt: Date
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            delete ret.active
            delete ret.password
        }
    }
})

schema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt
            .genSalt(10)
            .then(salt => {
                bcrypt.hash(this.password, salt)
                    .then(hash => {
                        this.password = hash
                        next()
                    })
                    .catch((err) => next(err))
            })
            .catch((err) => next(err))
    } else {
        next()
    }
})

schema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', schema)