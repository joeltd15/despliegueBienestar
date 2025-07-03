const Call = require('../models/call');

const getAllCalls = async () => {
    return await Call.find();
};

const getCallById = async (id) => {
    return await Call.findById(id);
};

const createCall = async (data) => {
    const call = new Call(data);
    return await call.save();
};

const updateCall = async (id, data) => {
    return await Call.findByIdAndUpdate(id, data, { new: true });
};

const deleteCall = async (id) => {
    return await Call.findByIdAndDelete(id);
};

module.exports = {
    getAllCalls,
    getCallById,
    createCall,
    updateCall,
    deleteCall
};