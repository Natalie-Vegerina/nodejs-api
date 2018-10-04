const express = require('express');
const {AuthService} = require('@services/');
const {baseValidator} = require('@validation/');
const {UserRegistrationSchema} = require('@schemas/');
const router = express.Router();

// TODO: Natalie - add validation schema
router.post('/sign-in', async function(req, res, next) {
    try {
        const token = await AuthService.signIn(req.body);
        res.json({token: token});
    }
    catch (e) {
        return next(e);
    }
});

router.post('/register', baseValidator.validate(UserRegistrationSchema), async function(req, res, next) {
    try {
        const user = await AuthService.register(req.body);
        const token = await AuthService.signIn(req.body);
        res.json({token: token});
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;