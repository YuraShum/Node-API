import express from 'express'
import 'dotenv/config'
import cors from "cors"
import cookieParser from "cookie-parser"
import http from 'http'
import router from './routes/mainRoutes.js'
import mongoose from 'mongoose'
import cron from "node-cron"
import subscribeModel from './models/subscribeModels.js'
import emailHandlers from './handlers/emailHandlers.js'

export const createServer = (mongoConect, port = 5020) => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use('', router)

    const server = http.createServer(app)

    mongoose.connect(mongoConect)
        .then(() => {
            console.log('connected to database')
            server.listen(port, () => {
                console.log('listening for requests on port:', port)
            })
        }).catch((error) => {
            console.log({ error })
            process.exit(1)
        })

    cron.schedule('0 0 0 * * *', async () => {
        const subscriptions = await subscribeModel.find()
        console.log('Subscriptions: ', subscriptions)
        await emailHandlers(subscriptions)
    });
    
    return server
}