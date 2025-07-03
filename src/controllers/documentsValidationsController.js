const documentValidationService = require("../services/DocumentsValidationsService")
const fs = require('fs');

class DocumentValidationController {
    async validateIdentity(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generateIdentityPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "identidad",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento de identidad",
                message: error.message,
            })
        }
    }

    async validateCertifyBank(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generateCertifyBnkPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Certificado",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento de identidad",
                message: error.message,
            })
        }
    }

    async validateCertifySisben(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const document = req.body.document
            const prompt = req.body.prompt || documentValidationService.generateCertifySisbenPrompt(name, document)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Sisben",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento de identidad",
                message: error.message,
            })
        }
    }

    async validatecommitmentletter(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const prompt = req.body.prompt || documentValidationService.generatecommitmentletterPrompt()

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Carta compromiso",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento de identidad",
                message: error.message,
            })
        }
    }

    async validateformatsocioeconomic(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const prompt = req.body.prompt || documentValidationService.generateformatsocioeconomicPrompt()

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Formato socioeconomico",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento de identidad",
                message: error.message,
            })
        }
    }

    async validatedisability(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generatedisabilityPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Certificado de discapacidad",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el certificado de discapacidad",
                message: error.message,
            })
        }
    }

    async validatenarp(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generatenarpPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Certificado NARP",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento",
                message: error.message,
            })
        }
    }

    async validatepeasant(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generatepeasantPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Certificado campesino",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento",
                message: error.message,
            })
        }
    }

    async validateregistrycivil(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generateregistrycivilPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Registro civil",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento",
                message: error.message,
            })
        }
    }

    async validatevictimconflict(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generatevictimconflictPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Victima del conflicto",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento",
                message: error.message,
            })
        }
    }

    async validatepregnant(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generatepregnantPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Certificado de embarazo",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento",
                message: error.message,
            })
        }
    }


    async validatenaturalphenomena(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generatenaturalphenomenaPrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Certificado de desplazamiento por fenomeno natural",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento",
                message: error.message,
            })
        }
    }


    async validateQualificationsCertificate(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "No se proporcionó ningún archivo",
                    message: "Debes subir un archivo PDF",
                })
            }

            const name = req.body.name
            const prompt = req.body.prompt || documentValidationService.generateQualificationsCertificatePrompt(name)

            const rawResponse = await documentValidationService.generateDocumentAnalysis(req.file.path, prompt)

            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path)

            const jsonResponse = documentValidationService.processJsonResponse(rawResponse)

            res.json({
                success: true,
                tipoValidacion: "Certificado de Notas",
                documento: req.file.originalname,
                response: jsonResponse,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error:", error)

            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }

            res.status(500).json({
                error: "Error procesando el documento",
                message: error.message,
            })
        }
    }
}

module.exports = new DocumentValidationController();
