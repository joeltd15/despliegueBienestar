const callRepository = require('../repositories/callRepository');

const getAllCalls = async () => {
    return await callRepository.getAllCalls();
}

const getCallById = async (id) => {
    return await callRepository.getCallById(id);
}

const createCall = async (data) => {
    return await callRepository.createCall(data);
}

const updateCall = async (id, data) => {
    return await callRepository.updateCall(id, data);
}

const deleteCall = async (id) => {
    return await callRepository.deleteCall(id);
}

module.exports = {
    getAllCalls,
    getCallById,
    createCall,
    updateCall,
    deleteCall
}