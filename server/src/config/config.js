const CURRENT_RATE_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

const emailMessagePattern = (current) => {
    const date = new Date()

    let day = date.getDate()
    let mounth = date.getMonth() + 1
    let year = date.getFullYear()
    
    return `
    <h4>Привіт!!</h4>
    <span>Станом на ${day}.${mounth}.${year}, поточний курс USD становить: ${current} UAH.</span>
    `
}
export  {
    CURRENT_RATE_URL,
    emailMessagePattern
}