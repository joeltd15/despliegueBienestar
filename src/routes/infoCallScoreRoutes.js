const express = require('express');
const router = express.Router();
const controller = require('../controllers/infoCallScoreController');

router.post('/generate', controller.generateScores);
router.get('/:id', controller.getScoreByInfoCallId);
router.get('/', controller.getAllScores);
router.put('/status/:id', controller.updateStatus);
router.put('/:id', controller.updateScore);

module.exports = router;
