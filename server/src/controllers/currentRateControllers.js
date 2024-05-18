import responseHandlers from "../handlers/responseHandlers.js"
import rateHandler from "../handlers/rateHandler.js"

const currentRateService = {
    getCurrentRate: async (request, response) => {
        try {
            const rate = await rateHandler('UAH')
            responseHandlers.ok(response, rate )
        } catch {
            responseHandlers.badRequest(response, 'Failed to get value')
        }
    }
}

export default currentRateService