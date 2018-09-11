class NotFoundError extends Error {
    constructor(message) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message ||
            'Entity was not found';

        this.status = 404;
    }
}

module.exports = NotFoundError;