const nodemailer = require('nodemailer')

const email = process.env.EMAIL_ACCOUNT

const trasporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: process.env.EMAIL_PASSWORD,
    },
})

module.exports.sendValidationEmail = (user) => {
    trasporter
        .sendMail({
            from: `"Actividad 4" <${email}>`,
            to: user.email,
            subject: 'Bienvenido/a a la actividad 4',
            html: `
                <h1>Bienvenido/a a la actividad 4 </h1>
                <p>Activa tu cuenta:</p>
                <a href="${process.env.HOST}/api/users/${user.id}/validate">Pulsa aquí</a>
            `,
        })
        .then(() => {
            console.log(`Email enviado a ${user.id}`)
        })
        .catch((err) => {
            console.error('Error enviando el correo', err)
        })
}