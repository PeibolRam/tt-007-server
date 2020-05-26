const mongoose = require('mongoose')

require('dotenv').config()

const propertySchema = mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    ownerWallet: {
        type: String,
        required: true
    },
    ownerCurp: {
        type: String,
        trim: true,
        uppercase: true,
        length: 18
    },
    birthdate: {
        type: Date
    },
    deedNumber: {
        type: Number
    },
    notaria: {
        type: String
    },
    numSolicitud: {
        type: Number
    },
    ubicacion: {
        type: String
    },
    calle: {
        type: String
    },
    numExterior: {
        type: Number
    },
    numInterior: {
        type: Number
    },
    colonia: {
        type: String
    },
    estado: {
        type: String
    },
    municipio: {
        type: String
    },
    codigoPosal: {
        type: Number,
        min : 10000,
        max : 99999
    },
})

const Property = mongoose.model('Property', propertySchema, "propertys")

module.exports = { Property }