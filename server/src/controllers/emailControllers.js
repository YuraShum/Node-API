import responseHandlers from '../handlers/responseHandlers.js'
import subscribeModel from '../models/subscribeModels.js'
import emailHandlers from '../handlers/emailHandlers.js'

const emailService = {
    sendEmails: async () => {
        console.log('prew send')
        const subscriptions = await subscribeModel.find()
        console.log('Subscriptions: ', subscriptions)
        await emailHandlers(subscriptions)
        console.log(`Send messages to amails(${subscriptions.length})`)

        return
    }
}

export default emailService