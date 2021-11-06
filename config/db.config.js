const mongoose = require('mongoose')
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer

MongoMemoryServer.create()
    .then((mongoServer) => mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        dbName: "postsDB",
        useUnifiedTopology: true
    }))
    .then(() => 
        console.info('DB connected')
    )
    .catch(() => {
        console.error('Error connecting DB')
        process.exit(1)
    })

process.on('SIGINT', () => {
    mongoose
        .disconnect()
        .then(() => {
            console.info('DB disconnected')
            process.exit(0)
        })
        .catch(() => {
            console.error('Error disconnecting DB')
            process.exit(1)
        })
})
