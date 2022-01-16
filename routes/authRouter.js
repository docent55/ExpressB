const Router = require('express');
const controller = require('../controllers/authController');

const router = new Router();

router.post('/registration', controller.registration);

module.exports = router;