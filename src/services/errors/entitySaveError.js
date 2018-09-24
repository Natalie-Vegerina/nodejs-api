const BaseError = require('@errors/baseError');

class EntitySaveError extends BaseError {
    constructor(message, original) {
        super(true);

        this.name = this.constructor.name;

        this.message = message ||
            'Failed to save entity';

        /*this.original = original;

        Error.captureStackTrace(this, this.constructor);
        if (this.original) {
            // this.new_stack = this.stack
            let messageLines = (this.message.match(/\n/g) || []).length + 1;
            this.stack = this.stack.split('\n').slice(0, messageLines + 1).join('\n') + '\n' +
                original.stack;
        }*/
        this.preserveStack(original);
    }
}

module.exports = EntitySaveError;