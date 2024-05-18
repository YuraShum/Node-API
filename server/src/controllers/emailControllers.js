import responseHandlers from '../handlers/responseHandlers.js'
import subscribeModel from '../models/subscribeModels.js'
import emailHandlers from '../handlers/emailHandlers.js'

const emailService = {
    sendEmails: async (request, response) => {
        const subscriptions = await subscribeModel.find()
        await emailHandlers(subscriptions)
        responseHandlers.ok(response, `Send messages to ${subscriptions.length} emails`)
    }
}

export default emailService