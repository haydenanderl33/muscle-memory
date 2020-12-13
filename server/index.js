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
            name: 'Muscle Memory Platinum',
          },
          unit_amount: 2500,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // success_url: 'http://localhost:3000/#/success',
    // cancel_url: 'http://localhost:3000/#/home',
    success_url: 'http://178.128.4.188:5555/#/success',
    cancel_url: 'http://178.128.4.188:5555/#/home',
  });

  res.json({ id: session.id });

})


app.listen(SERVER_PORT, () => console.log(`Started at the ${SERVER_PORT} now we here`))


