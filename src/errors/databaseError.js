class DatabaseError extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message ||
            'Database operation failed';

        this.status = status || 500;
    }
}

module.exports = DatabaseError;