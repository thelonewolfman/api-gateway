const express = require('express');

const router = express.Router();

const authRouter = require('../../auth/routes');
const apiRouter = require('../../api-gateway');

router.use(authRouter);
router.use('/api', apiRouter);

module.exports = router;
