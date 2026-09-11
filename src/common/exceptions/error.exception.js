export const ApplicationException = ({
    message = "error",
    options = {
        cause: { status: 400 }

    }
} = {}) => {

    throw new error(message, options)
}
export const ConflictException = (message = "Conflict", extra={}) => {
    return ApplicationException({
        message,
        options: {
            cause: { status: 409, ...extra },
        }
    })
}
export const NotfoundException = (message = "Not Found", extra={}) => {
    return ApplicationException({
        message,
        options: {
            cause: { status: 404, ...extra },
        }
    })
}
export const UnauthorizedException = (message = "Unauthorized", extra={}) => {
    return ApplicationException({
        message,
        options: {
            cause: { status: 401, ...extra },
        }
    })
}
export const ForbiddenException = (message = "Forbidden", extra={}) => {
    return ApplicationException({
        message,
        options: {
            cause: { status: 403, ...extra },
        }
    })
}