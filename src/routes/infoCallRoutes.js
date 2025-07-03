const express = require("express")
const router = express.Router()
const infoCallController = require("../controllers/infoCallController")
const validateInfoCall = require("../middlewares/validateInfoCall")
const upload = require("../middlewares/uploadMiddleware")
const processFileUploads = require("../middlewares/processFileUploads")
const authMiddleware = require("../middlewares/authMiddleware")

router.post(
  "/",
  upload.fields([
    { name: "idDocumentPdf", maxCount: 1 },
    { name: "qualificationsCertificate", maxCount: 1 },
    { name: "disabilityCertificate", maxCount: 1 },
    { name: "communityCertificate", maxCount: 1 },
    { name: "peasantCertificate", maxCount: 1 },
    { name: "singleParentCertificate", maxCount: 1 },
    { name: "sisbenCertificate", maxCount: 1 },
    { name: "bankCertificatePdf", maxCount: 1 },
    { name: "commitmentAct", maxCount: 1 },
    { name: "socioeconomicStudy", maxCount: 1 },
    { name: "victimCertificate", maxCount: 1 },
    { name: "pregnancyCertificate", maxCount: 1 },
    { name: "displacementCertificate", maxCount: 1 },
  ]),
  processFileUploads,
  validateInfoCall,
  infoCallController.createInfoCall,
)

router.get("/", authMiddleware(), infoCallController.getAllInfoCalls)
router.get("/:id", authMiddleware(), infoCallController.getInfoCallById)
router.delete("/:id", authMiddleware(), infoCallController.deleteInfoCall)
router.get("/:id/merge-pdfs", authMiddleware(), infoCallController.mergePdfs)
router.get('/by-document/:idNumber', infoCallController.getByDocument);

module.exports = router
