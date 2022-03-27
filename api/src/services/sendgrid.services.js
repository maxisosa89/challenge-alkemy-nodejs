const sgMail = require('@sendgrid/mail')
const {
    API_SENDGRID
  } = process.env

sgMail.setApiKey(API_SENDGRID)

const sendMail = async ({ email, nameUser }) => {
  try {
    const msg = {
      to: email,
      from: "msosa89@outlook.com",
      subject: "Bienvenido a la API de Disney!",
      text: `Hola ${nameUser}! Este es mi proyecto para el challenge de NodeJs. Saludos.`,
      mail_settings: {
          sandbox_mode: {
              enable: false
          }
      }
    }
    return await sgMail.send(msg)
  } catch(error) {
      throw err
  }
}

module.exports = {
  sendMail,
  sgMail
}