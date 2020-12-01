require('dotenv').config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')

const { SERVER_PORT,CONNECTION_STRING, SESSION_SECRET } = process.env
const auth = require('./Controllers/authController')
const workouts = require('./Controllers/workoutController')
const instructions = require('./Controllers/instructionsController')



const app = express()

app.use(express.json());

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

app.listen(SERVER_PORT, () => console.log(`Started at the ${SERVER_PORT} now we here`))