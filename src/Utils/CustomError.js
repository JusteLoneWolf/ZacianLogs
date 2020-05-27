class CustomError{
    constructor(){

    }
    error(message,errCode,error) {
        this.name = this.constructor.name;
        this.message = message;
        this.code = errCode ? errCode : "unknown";
        this.error = error;
        Error.captureStackTrace(this, this.message)
    }
}

module.exports = CustomError;