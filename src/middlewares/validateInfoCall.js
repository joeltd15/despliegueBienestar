const InfoCall = require('../models/infoCall');

module.exports = async (req, res, next) => {
  const body = req.body;

  const requiredFields = [
    "email", "trainingCenter", "trainingSite", "trainingModality", "fullName", "idType", "idNumber",
    "programName", "recordNumber", "learnerEmail", "learnerPhone", "trainingStartDate", "trainingEndDate",
    "gender", "age", "hasDisability", "isFromCommunity", "isPeasant", "isSingleParent", "isVictim",
    "isPregnantOrNursing", "isGenderViolenceVictim", "sisbenGroup", "displacedByNaturalPhenomena",
    "isLearnerRepresentative", "participatesInProjects", "learnerAddress", "callId", "qualificationsCertificate", "training_level"
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return res.status(400).json({ error: `Field '${field}' is required.` });
    }
  }

  // Archivos obligatorios
  if (!body.idDocumentPdf) return res.status(400).json({ error: "El documento de identidad es requerido" });
  if (!body.qualificationsCertificate) return res.status(400).json({ error: "El certificado de notas es obligatorio." });
  if (!body.sisbenCertificate) return res.status(400).json({ error: "Sisben certificate PDF is requerido." });
  if (!body.bankCertificatePdf) return res.status(400).json({ error: "El certificado bancario es requerido." });
  if (!body.commitmentAct) return res.status(400).json({ error: "El acta de compromiso es requerido." });
  if (!body.socioeconomicStudy) return res.status(400).json({ error: "Formato socieconomico requerido." });

  // Archivos condicionales
  if (body.hasDisability === "true" && !body.disabilityCertificate) {
    return res.status(400).json({ error: "Disability certificate is required when hasDisability is true." });
  }
  if (body.isFromCommunity === "true" && !body.communityCertificate) {
    return res.status(400).json({ error: "Community certificate is required when isFromCommunity is true." });
  }
  if (body.isPeasant === "true" && !body.peasantCertificate) {
    return res.status(400).json({ error: "Peasant certificate is required when isPeasant is true." });
  }
  if (body.isSingleParent === "true" && !body.singleParentCertificate) {
    return res.status(400).json({ error: "Single parent certificate is required when isSingleParent is true." });
  }
  if (body.isVictim === "true" && !body.victimCertificate) {
    return res.status(400).json({ error: "Victim certificate is required when isVictim is true." });
  }
  if (body.isPregnantOrNursing === "true" && !body.pregnancyCertificate) {
    return res.status(400).json({ error: "Pregnancy certificate is required when isPregnantOrNursing is true." });
  }
  if (body.displacedByNaturalPhenomena === "true" && !body.displacementCertificate) {
    return res.status(400).json({ error: "Displacement certificate is required when displacedByNaturalPhenomena is true." });
  }

  // Validación de cédula única
  const existing = await InfoCall.findOne({ idNumber: body.idNumber });
  if (existing) {
    return res.status(400).json({ error: "Ya existe un registro con este número de cédula." });
  }

  next();
};
