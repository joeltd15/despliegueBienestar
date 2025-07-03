const express = require('express');
const callController = require('../controllers/callController.js');
const authMiddleware = require("../middlewares/authMiddleware.js");
const validateCall = require('../middlewares/validateCall.js');

const router = express.Router();

router.get("/", authMiddleware(), callController.getAllCalls);
router.get("/:id", authMiddleware(), callController.getCallById);
router.post("/", authMiddleware(), validateCall, callController.createCall);
router.put("/:id", authMiddleware(), validateCall, callController.updateCall);
router.delete("/:id", authMiddleware(), callController.deleteCall);

module.exports = router;