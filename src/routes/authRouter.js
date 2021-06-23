const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const verifyToken = require('../controllers/verifyToken');

router.post('/signup', authCtrl.signup);

router.post('/signin', authCtrl.signin);

router.get('/profile', verifyToken, authCtrl.profile);

module.exports = router