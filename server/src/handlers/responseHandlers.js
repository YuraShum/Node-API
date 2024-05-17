const responseHandlers = {
    conflictRequest: (response) => {
        return responseWidthData(
            response,
            409,
            {
                status: 409,
                message: 'Unfortunately, the email is already taken'
            }
        )
    },
    badRequest: (response, message) => {
        return responseWidthData(
            response,
            400,
            {
                status: 400,
                message
            }
        )
    },
    ok: (response, data) => {
        return responseWidthData(response, 200, data)
    },
    error: (response) =>  {
        return responseWidthData(
            response,
            404,
            {
                status: 404,
                message: 'Something went wrong'
            }
        )
    }
}

const responseWidthData = (response, statusCode, data) => {
    return response.status(statusCode).json(data)
}

export default responseHandlers