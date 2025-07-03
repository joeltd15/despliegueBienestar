const express = require("express")
const documentValidationController = require('../controllers/documentsValidationsController')
const upload = require('../middlewares/uploadMiddleware')

const router = express.Router()

// Rutas para validación de documentos
router.post("/validar/identidad", upload.single("documento"), documentValidationController.validateIdentity)
router.post("/validar/certificado/bancario", upload.single("documento"), documentValidationController.validateCertifyBank)
router.post("/validar/sisben", upload.single("documento"), documentValidationController.validateCertifySisben)
router.post("/validar/commitment/letter", upload.single("documento"), documentValidationController.validatecommitmentletter)
router.post("/validar/commitment/socioeconomic", upload.single("documento"), documentValidationController.validateformatsocioeconomic)
router.post("/validar/commitment/disability", upload.single("documento"), documentValidationController.validatedisability)
router.post("/validar/commitment/narp", upload.single("documento"), documentValidationController.validatenarp)
router.post("/validar/commitment/peasant", upload.single("documento"), documentValidationController.validatepeasant)
router.post("/validar/commitment/registrycivil", upload.single("documento"), documentValidationController.validateregistrycivil)
router.post("/validar/commitment/victimconflict", upload.single("documento"), documentValidationController.validatevictimconflict)
router.post("/validar/commitment/pregnant", upload.single("documento"), documentValidationController.validatepregnant)
router.post("/validar/commitment/naturalphenomena", upload.single("documento"), documentValidationController.validatenaturalphenomena)
router.post("/validar/qualifications/certificate", upload.single("documento"), documentValidationController.validateQualificationsCertificate)


module.exports = router;
