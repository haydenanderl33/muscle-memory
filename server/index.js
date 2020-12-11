require('dotenv').config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')


const { SERVER_PORT,CONNECTION_STRING, SESSION_SECRET, SECRET_KEY} = process.env
const auth = require('./Controllers/authController')
const workouts = require('./Controllers/workoutController')
const instructions = require('./Controllers/instructionsController')
const nodemail = require('./Controllers/emailController')
const stripe = require('stripe')(SECRET_KEY)
const cors = require('cors');
const bodyParser = require('body-parser');
// const YOUR_DOMAIN = 'http://localhost:5555';

const app = express()
app.use(express.static(`${__dirname}/../build`))

app.use(express.json());

app.use( cors() );
app.use( bodyParser.json() );

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
    
}))


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db =>{
    app.set('db', db)
    console.log("Life is good and db connected")
}).catch( err => console.log(err))

// ENDPOINTS
//Auth
app.post('/auth/register', auth.register)
app.post('/auth/login', auth.login)
app.post('/auth/logout', auth.logout)
app.get('/api/user', auth.getUser)

//User
app.get('/api/workouts/:mm_id', workouts.getWorkouts)
app.post('/api/workouts/add/:mm_id', workouts.addWorkout)
app.delete('/api/workouts/delete/:ws_id', workouts.deleteWorkout)

//Instructions
app.get('/api/instructions', instructions.getInstructions)
app.put('/api/instructions/:workout_id', instructions.updateInstructions)

//Email
app.post('/api/email', nodemail.email)

//Stripe
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://localhost:3000/home',
    cancel_url: 'https://localhost:3000/goals',
  });

  res.json({ id: session.id });
//   const charge = stripe.charges.create({
//     amount: 2500, // amount in cents, again
//     currency: 'usd',
//     customer: 0,
//     // description: 'Test charge from react app'
//   }, function(err, charge) {
//       if (err) {
        
//         console.log(err)
//         return res.sendStatus(500)}
//       return res.sendStatus(200);
// });
})


app.listen(SERVER_PORT, () => console.log(`Started at the ${SERVER_PORT} now we here`))


//Stripe
// app.post('/api/checkout', function(req, res, next){
//     //convert amount to pennies
//   //   console.log("Begining payment");
//   //   const amountArray = req.body.amount.toString().split('');
//   //   const pennies = [];
//   //   for (var i = 0; i < amountArray.length; i++) {
//   //     if(amountArray[i] === ".") {
//   //       if (typeof amountArray[i + 1] === "string") {
//   //         pennies.push(amountArray[i + 1]);
//   //       } else {
//   //         pennies.push("0");
//   //       }
//   //       if (typeof amountArray[i + 2] === "string") {
//   //         pennies.push(amountArray[i + 2]);
//   //       } else {
//   //         pennies.push("0");
//   //       }
//   //         break;
//   //     } else {
//   //         pennies.push(amountArray[i])
//   //     }
//   //   }
//   //   const convertedAmt = parseInt(pennies.join(''));
//   // console.log("amt", convertedAmt);
//   const charge = stripe.charges.create({
//   amount: 5, // amount in cents, again
//   currency: 'usd',
//   source: req.body.token.id,
//   description: 'Test charge from react app'
//   }, function(err, charge) {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500)
//     }
//     return res.sendStatus(200);
//   // if (err && err.type === 'StripeCardError') {
//   //   // The card has been declined
//   // }
//   });
//   });