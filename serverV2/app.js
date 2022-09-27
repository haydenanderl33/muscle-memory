require('dotenv').config()
const express = require('express')

const connectDB = require('./db/connect')

const nodemail = require('./controllers/emailController')

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000


app.post('/api/email', nodemail.email)


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
          console.log(`Server listening on port ${port}`)
        })
    } catch (error){
        console.log(error)
    }
}
start()
