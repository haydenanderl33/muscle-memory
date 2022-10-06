require('dotenv').config()
const express = require('express')
var cors = require('cors')

const connectDB = require('./db/connect')
const passwordRouter = require('./routes/password-route')
const authRouter = require('./routes/auth-route')
const { SERVER_PORT } = process.env




const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/password', passwordRouter)
app.use('/api/v1/auth', authRouter)

const port = SERVER_PORT || 5555




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
