const documentValidationService = require("../services/DocumentsValidationsService");
const AWS = require("aws-sdk");

// Configuración S3 para Wasabi
const s3 = new AWS.S3({
  accessKeyId: process.env.WASABI_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY,
  endpoint: process.env.WASABI_ENDPOINT,
  region: process.env.WASABI_REGION,
});

const deleteFileFromWasabi = async (key) => {
  try {
    await s3.deleteObject({
      Bucket: process.env.WASABI_BUCKET,
      Key: key,
    }).promise();
    console.log(`✅ Archivo eliminado de Wasabi: ${key}`);
  } catch (error) {
    console.error(`❌ Error eliminando archivo de Wasabi: ${error.message}`);
  }
};

class DocumentValidationController {
  constructor() {
    this.validateIdentity = this.validateIdentity.bind(this);
    this.validateCertifyBank = this.validateCertifyBank.bind(this);
    this.validateCertifySisben = this.validateCertifySisben.bind(this);
    this.validatecommitmentletter = this.validatecommitmentletter.bind(this);
    this.validateformatsocioeconomic = this.validateformatsocioeconomic.bind(this);
    this.validatedisability = this.validatedisability.bind(this);
    this.validatenarp = this.validatenarp.bind(this);
    this.validatepeasant = this.validatepeasant.bind(this);
    this.validateregistrycivil = this.validateregistrycivil.bind(this);
    this.validatevictimconflict = this.validatevictimconflict.bind(this);
    this.validatepregnant = this.validatepregnant.bind(this);
    this.validatenaturalphenomena = this.validatenaturalphenomena.bind(this);
    this.validateQualificationsCertificate = this.validateQualificationsCertificate.bind(this);
  }

  async validate(req, res, promptFunction, tipoValidacion) {
    try {
      if (!req.file || !req.file.location || !req.file.key) {
        return res.status(400).json({
          error: "No se proporcionó ningún archivo",
          message: "Debes subir un archivo PDF",
        });
      }

      const name = req.body.name;
      const document = req.body.document;

      const prompt = req.body.prompt ||
        (promptFunction.length === 2
          ? promptFunction(name, document)
          : promptFunction.length === 1
          ? promptFunction(name)
          : promptFunction());

      const rawResponse = await documentValidationService.generateDocumentAnalysisFromUrl(
        req.file.location,
        prompt
      );

      const jsonResponse = documentValidationService.processJsonResponse(rawResponse);

      if (jsonResponse.result === false) {
        await deleteFileFromWasabi(req.file.key);
      }

      res.json({
        success: true,
        tipoValidacion,
        documento: req.file.originalname,
        response: jsonResponse,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        error: `Error procesando el documento (${tipoValidacion})`,
        message: error.message,
      });
    }
  }

  validateIdentity(req, res) {
    this.validate(req, res, documentValidationService.generateIdentityPrompt, "identidad");
  }

  validateCertifyBank(req, res) {
    this.validate(req, res, documentValidationService.generateCertifyBnkPrompt, "Certificado Bancario");
  }

  validateCertifySisben(req, res) {
    this.validate(req, res, documentValidationService.generateCertifySisbenPrompt, "Sisben");
  }

  validatecommitmentletter(req, res) {
    this.validate(req, res, () => documentValidationService.generatecommitmentletterPrompt(), "Carta compromiso");
  }

  validateformatsocioeconomic(req, res) {
    this.validate(req, res, () => documentValidationService.generateformatsocioeconomicPrompt(), "Formato socioeconómico");
  }

  validatedisability(req, res) {
    this.validate(req, res, documentValidationService.generatedisabilityPrompt, "Certificado discapacidad");
  }

  validatenarp(req, res) {
    this.validate(req, res, documentValidationService.generatenarpPrompt, "Certificado NARP");
  }

  validatepeasant(req, res) {
    this.validate(req, res, documentValidationService.generatepeasantPrompt, "Certificado campesino");
  }

  validateregistrycivil(req, res) {
    this.validate(req, res, documentValidationService.generateregistrycivilPrompt, "Registro civil");
  }

  validatevictimconflict(req, res) {
    this.validate(req, res, documentValidationService.generatevictimconflictPrompt, "Víctima conflicto");
  }

  validatepregnant(req, res) {
    this.validate(req, res, documentValidationService.generatepregnantPrompt, "Certificado embarazo");
  }

  validatenaturalphenomena(req, res) {
    this.validate(req, res, documentValidationService.generatenaturalphenomenaPrompt, "Fenómeno natural");
  }

  validateQualificationsCertificate(req, res) {
    this.validate(req, res, documentValidationService.generateQualificationsCertificatePrompt, "Certificado Notas");
  }
}

module.exports = new DocumentValidationController();
