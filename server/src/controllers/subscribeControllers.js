import subscribeModel from '../models/subscribeModels.js'
import responseHandlers from '../handlers/responseHandlers.js'


const subscribeService = {
    createSubscribe: async (request, response) => {
        try {
            const {email} = await request.body 
            const checkSubscribe = await subscribeModel.findOne({email})

            if(checkSubscribe){
                return responseHandlers.conflictRequest(response)
            }

            const newSubscribe = new subscribeModel()

            newSubscribe.email = email
            await newSubscribe.save()

            responseHandlers.ok(
                response,
                {
                    email
                }
            )
        } catch  {
            responseHandlers.error(response)
        }
    },
    
}

export default subscribeService