const express = require('express');
const { createUser, loginUser, checkAuth, signOut, resetPasswordRequest } = require('../Controller/auth');

const router = express.Router();

router.post('/signup', createUser)
    .post('/login', loginUser)
    .get('/checkauth', checkAuth)
    .get('/logout', signOut)
    .post('/reset-password-request', resetPasswordRequest)

exports.router = router;