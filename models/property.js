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
        type: String
    },
    notaria: {
        type: String
    },
    walletNotario: {
        type: String
    },
    numSolicitud: {
        type: String
    },
    ubicacion: {
        type: String
    },
    calle: {
        type: String
    },
    numExterior: {
        type: String
    },
    numInterior: {
        type: String
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
        type: String
    },
    hash: {
        type: Array
    },
    idBc: {
        type: Number
    },
})

const Property = mongoose.model('Property', propertySchema, "propertys")

module.exports = { Property }