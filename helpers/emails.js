import nodemailer from 'nodemailer'

const emailRegistry = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const {name, email, token} = data

    // send email

    await transport.sendMail({
        from: 'Reciclando-app',
        to: email,
        subject: 'Confirma tu cuenta en Reciclando-app',
        text: 'Confirma tu cuenta en Reciclando-app',
        html:   `<p>
                    Hola ${name}, comprueba tu cuenta en reciclando-app
                </p>
                <p>
                    Activa tu cuenta en el siguiente enlace: 
                    <a href="${process.env.BACKEND_URL}:${process.env.BACKEND_PORT ?? 3000}/auth/confirmar-cuenta/${token}"> Confirmar Cuenta</a>
                </p>
                <p>
                    Si no creaste esta cuenta puedes ignorar este mensaje
                </p>`
    })
}


export {
    emailRegistry   
}