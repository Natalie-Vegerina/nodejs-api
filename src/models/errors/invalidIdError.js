class InvalidIdError extends Error {
    constructor(message) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message ||
            'Invalid id';
    }
}

module.exports = InvalidIdError;