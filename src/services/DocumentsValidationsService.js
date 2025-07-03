const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

class DocumentValidationService {
  constructor() {
    this.genAI = new GoogleGenerativeAI("AIzaSyAXTfeMLSniHiI9IEZ7TwbfWUGySbRqUNk");
  }

  async generateDocumentAnalysisFromUrl(fileUrl, prompt) {
    try {
      const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
      const base64Data = Buffer.from(response.data).toString("base64");

      const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: "application/pdf",
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const genResponse = await result.response;
      return genResponse.text();
    } catch (error) {
      console.error("Error generando análisis desde URL:", error);
      throw error;
    }
  }

  processJsonResponse(rawResponse) {
  try {
    // Buscar bloque tipo ```json ... ```
    const blockMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = blockMatch
      ? blockMatch[1]
      : rawResponse;

    return JSON.parse(jsonString.trim());
  } catch (e) {
    console.error("Error al parsear JSON:", e);
    return {
      result: false,
      error: "La respuesta no es un JSON válido.",
      valorOriginal: rawResponse,
    };
  }
}


  generateIdentityPrompt(name) {
    return `Analiza cuidadosamente el contenido del documento proporcionado. Solo debe considerarse válido si es un **documento de identidad oficial** de una persona, específicamente uno de los siguientes tipos:

- Cédula de Ciudadanía  
- Tarjeta de Identidad  
- Cédula de Extranjería  
- Permiso por Protección Temporal (PPT)  

El documento **no debe ser** otro tipo como Sisbén, certificados bancarios, etc.

Debe contener al menos un **nombre y un apellido** que coincidan con: "${name}".

Responde estrictamente en formato JSON:

{
  "result": true/false
}`;
  }

  // Repite esto para los demás prompts...
  generateCertifyBnkPrompt(name) {
    return `Revisa el documento y verifica que sea un certificado bancario válido y que contenga "${name}". Responde con: { "result": true/false }`;
  }

  generateCertifySisbenPrompt(name, document) {
    return `Revisa el certificado Sisbén que contenga el nombre "${name}" y documento "${document}". Responde con: { "result": true/false }`;
  }

  generatecommitmentletterPrompt() {
    return `Verifica que sea una carta de compromiso firmada. Responde con: { "result": true/false }`;
  }

  generateformatsocioeconomicPrompt() {
    return `Verifica que sea un formato de registro socioeconómico. Responde con: { "result": true/false }`;
  }

  generatedisabilityPrompt(name) {
    return `Verifica que sea un certificado de discapacidad y contenga el nombre "${name}". Responde con: { "result": true/false }`;
  }

  generatenarpPrompt(name) {
    return `Verifica que sea un certificado NARP válido con nombre "${name}". Responde con: { "result": true/false }`;
  }

  generatepeasantPrompt(name) {
    return `Verifica que sea un certificado campesino con nombre "${name}". Responde con: { "result": true/false }`;
  }

  generateregistrycivilPrompt(name) {
    return `Verifica que sea un registro civil con nombre "${name}". Responde con: { "result": true/false }`;
  }

  generatevictimconflictPrompt(name) {
    return `Verifica que sea un certificado de víctima con nombre "${name}". Responde con: { "result": true/false }`;
  }

  generatepregnantPrompt(name) {
    return `Verifica que sea un certificado de embarazo/lactancia con nombre "${name}". Responde con: { "result": true/false }`;
  }

  generatenaturalphenomenaPrompt(name) {
    return `Verifica que sea un certificado de desplazamiento por fenómeno natural con nombre "${name}". Responde con: { "result": true/false }`;
  }

  generateQualificationsCertificatePrompt(name) {
    return `Verifica que sea un certificado de notas SENA con nombre "${name}". Responde con: { "result": true/false }`;
  }
}

module.exports = new DocumentValidationService();
