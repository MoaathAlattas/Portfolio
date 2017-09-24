const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const cors = require('cors')({origin: true})

const email = functions.config().gmail.email
const password = encodeURIComponent(functions.config().gmail.password)
const mailTransport = nodemailer.createTransport(
    `smtps://${encodeURIComponent(email)}:${password}@smtp.gmail.com`
    );

exports.handler = (req, res)=>{
  cors(req, res, ()=> {

    if (req.method != "POST") {

          res.status(200).send(false)
          return;

    } else {

      sendEmail(req.body)
      .then(()=> { 
          res.status(200).send(true)
          res.status(200).end()
        })

    }
  })
}

function sendEmail(data) {

    const mailOptions = {
      from: `${data.name} <${data.email}>`,
      to: email
    }

    mailOptions.subject = `Contact Form Message: ${data.name}`

    mailOptions.html = `<p><b>Name:</b> ${data.name}</p>
                        <p><b>Email:</b> ${data.email}</p>
                        <p><b>Message:</b> ${data.message}</p>`
                        
    return mailTransport.sendMail(mailOptions)
  }