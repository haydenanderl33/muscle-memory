const nodemailer = require('nodemailer')

const { EMAIL, PASSWORD } = process.env

module.exports = {


    email: async (req, res) => {
      const { email } = req.body
      console.log(email)

  
      try {
        //invoke the createTransport function passing in your email information. 
        let transporter = nodemailer.createTransport({
          service: 'Yahoo',
          auth: {
            user: EMAIL,
            pass: PASSWORD
          }
        });
  
        //invoke the sendMail function with the info in the email
        let info = await transporter.sendMail({
          from: EMAIL, //This will show up when you go into the email
        //   '${name}'
          to: `<${email}>`,
          subject: "Welcome to Muscle Memory", //This will show on the subject of the email
          text: "Thanks for signing up for Muscle Memory" , //for clients with plaintext support only
          // html: "Thanks for signing up for Muscle Memory" 
                // <img src="cid:unique@nodemailer.com"/>,
          // attachments: [
          //   { //this is the attachment of the document
          //     filename: 'license.txt',
          //     path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
          //   },
          //   { //this is the embedded image
          //     cid: 'unique@nodemailer.com', //same cid value as in the html img src
          //     path:image
          //   }
          // ]
        }, (err, res) => {
          if (err) {
            console.log('err', err)
          } else {
            console.log('res', res)
            res.status(200).send(info)
          }
        })
      } catch (err) {
        console.log(err)
        res.sendStatus(500)
      }
    }
  }