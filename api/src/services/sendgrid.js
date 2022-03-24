const sgMail = require('@sendgrid/mail')
const {
    API_SENDGRID
  } = process.env

sgMail.setApiKey(API_SENDGRID)

module.exports = sgMail;