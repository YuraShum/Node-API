import express from 'express'
import 'dotenv/config'
import cors from "cors"
import cookieParser from "cookie-parser"
import http from 'http'
import router from './src/routes/mainRoutes.js'
import mongoose from 'mongoose'
import cron from "node-cron"
import emailService from './src/controllers/emailControllers.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('', router)


const server = http.createServer(app)

cron.schedule('0 0 0 * * *', () => {
    emailService.sendEmails()
});


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to database')
        server.listen(process.env.PORT || 5020, () => {
            console.log('listening for requests on port:', process.env.PORT || 5020)
        })
    }).catch((error) => {
        console.log({ error })
        process.exit(1)
    })
