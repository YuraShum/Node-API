import axios from "axios"
import { CURRENT_RATE_URL } from "../config/config.js"

const rateHandler = async (currency) => {

    try {
        const res = await axios.get(CURRENT_RATE_URL)
        return res.data.rates[currency]
    } catch {

    }

}

export default rateHandler