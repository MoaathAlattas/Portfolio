const functions = require('firebase-functions')
const contact = require('./contact')


exports.sendEmail = functions.https.onRequest((req, res) => contact.handler(req, res))