import express from 'express'
import currentRateService from '../controllers/currentRateControllers.js'
import subscribeService from '../controllers/subscribeControllers.js'
import emailService from '../controllers/emailControllers.js'

const router = express.Router()

router.get(
    '/rate',
    currentRateService.getCurrentRate
)

router.post(
    '/subscribe',
    subscribeService.createSubscribe
)

router.post(
    '/sendEmails',
    emailService.sendEmails
)

export default router