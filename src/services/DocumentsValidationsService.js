const { GoogleGenerativeAI } = require("@google/generative-ai")
const fs = require('fs');

class DocumentValidationService {
    constructor() {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAXTfeMLSniHiI9IEZ7TwbfWUGySbRqUNk"
        this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    }

    async generateDocumentAnalysis(filePath, prompt) {
        try {
            if (!fs.existsSync(filePath)) {
                throw new Error("El archivo no existe")
            }

            const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" })

            const fileData = fs.readFileSync(filePath)
            const base64Data = fileData.toString("base64")

            const imagePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: "application/pdf",
                },
            }

            const result = await model.generateContent([prompt, imagePart])
            const response = await result.response
            return response.text()
        } catch (error) {
            console.error("Error generando análisis:", error)
            throw error
        }
    }

    processJsonResponse(rawResponse) {
        try {
            const jsonString = rawResponse.replace(/```json\n?|```/g, "").trim()
            return JSON.parse(jsonString)
        } catch (e) {
            console.error("Error al parsear JSON de la respuesta:", e)
            return {
                error: "La respuesta no es un JSON válido.",
                valorOriginal: rawResponse,
            }
        }
    }

    generateIdentityPrompt(name) {
        return `Analiza cuidadosamente el contenido del documento proporcionado. Solo debe considerarse válido si es un **documento de identidad oficial** de una persona, específicamente uno de los siguientes tipos:

- Cédula de Ciudadanía  
- Tarjeta de Identidad  
- Cédula de Extranjería  
- Permiso por Protección Temporal (PPT)  

El documento **no debe ser** otro tipo de documento como Sisbén, certificados bancarios, contratos, facturas, ni ningún otro que no sea estrictamente de identificación personal oficial.

Además, el documento debe contener al menos un **nombre y un apellido** que coincidan con: "${name}".

Responde estrictamente en formato JSON con esta estructura:

{
  "result": true/false
}`
    }

    generateCertifyBnkPrompt(name) {
        return `Revisa el documento y verifica que sea un certificado bancario valido y que contenga al menos un nombre y un apellido coincidente "${name}". 
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generateCertifySisbenPrompt(name, document) {
        return `Revisa el documento y verifica que sea un certificado de sisben valido y que contenga al menos un nombre y un apellido coincidente "${name}" y el documento "${document}". 
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generatecommitmentletterPrompt() {
        return `Revisa el documento y verifica que sea una carta de compromiso y cumplimiento como benficiario y que este firmada. 
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generateformatsocioeconomicPrompt() {
        return `Revisa el documento y verifica que sea un formato de registro socieconomico. 
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generatedisabilityPrompt(name) {
        return `Revisa el documento y verifica que sea un certificado de discapacidad valido y que contenga al menos un nombre y un apellido coincidente "${name}".  
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generatenarpPrompt(name) {
        return `Revisa el documento y verifica que sea un certificado de autorreconocimiento como miembro de comunidades NARP y que contenga al menos un nombre y un apellido coincidente "${name}".  
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generatepeasantPrompt(name) {
        return `Revisa el documento y verifica que sea un certificado de campesino y que contenga al menos un nombre y un apellido coincidente "${name}".  
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generateregistrycivilPrompt(name) {
        return `Revisa el documento y verifica que sea un certificado de registro civil y que contenga al menos un nombre y un apellido coincidente "${name}".  
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generatevictimconflictPrompt(name) {
        return `Revisa el documento y verifica que sea un certificado de unidad para las victimas y que contenga al menos un nombre y un apellido coincidente "${name}".  
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generatepregnantPrompt(name) {
        return `Revisa el documento y verifica que sea un certificado de lactancia y que contenga al menos un nombre y un apellido coincidente "${name}".  
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generatenaturalphenomenaPrompt(name) {
        return `Revisa el documento y verifica que sea un certificado de desplazamiento por fenomenos naturales y que contenga al menos un nombre y un apellido coincidente "${name}".  
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    generateQualificationsCertificatePrompt(name) {
        return `Revisa el documento y verifica que sea un certificado de notas del sena y que contenga al menos un nombre y un apellido coincidente "${name}".  
        Responde en formato JSON con la siguiente estructura:
        {
            "result": true/false
        }`
    }

    //   generateAcademicPrompt(name, institucion = "", tipoTitulo = "") {
    //     return `Revisa el documento y verifica que sea un documento académico válido (diploma, certificado, título universitario, constancia de estudios) y que contenga el nombre "${name}".
    //         ${institucion ? `También verifica si menciona la institución: "${institucion}".` : ""}
    //         ${tipoTitulo ? `Y verifica si corresponde al tipo de título: "${tipoTitulo}".` : ""}

    //         Responde en formato JSON con la siguiente estructura:
    //         {
    //             "esDocumentoAcademico": true/false,
    //             "contieneNombre": true/false,
    //             "tipoDocumento": "diploma/certificado/título/constancia/otro",
    //             "nombreEncontrado": "nombre encontrado en el documento",
    //             "institucionEncontrada": "institución mencionada en el documento",
    //             "tituloPrograma": "título o programa mencionado",
    //             "fechaExpedicion": "fecha de expedición si está disponible",
    //             "observaciones": "comentarios adicionales"
    //         }`
    //   }

    //   generateBankingPrompt(name, banco = "", numeroCuenta = "") {
    //     return `Revisa el documento y verifica que sea un documento bancario válido (extracto bancario, certificación bancaria, estado de cuenta, carta del banco) y que contenga el nombre "${name}".
    //         ${banco ? `También verifica si menciona el banco: "${banco}".` : ""}
    //         ${numeroCuenta ? `Y verifica si contiene el número de cuenta: "${numeroCuenta}".` : ""}

    //         Responde en formato JSON con la siguiente estructura:
    //         {
    //             "esDocumentoBancario": true/false,
    //             "contieneNombre": true/false,
    //             "tipoDocumento": "extracto/certificacion/estado_cuenta/carta_banco/otro",
    //             "nombreEncontrado": "nombre encontrado en el documento",
    //             "bancoEncontrado": "banco mencionado en el documento",
    //             "numeroCuentaEncontrado": "número de cuenta si está visible",
    //             "fechaDocumento": "fecha del documento si está disponible",
    //             "saldoVisible": true/false,
    //             "observaciones": "comentarios adicionales"
    //         }`
    //   }
}

module.exports = new DocumentValidationService();
