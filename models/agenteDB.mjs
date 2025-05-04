import mongoose from 'mongoose';

const agenteSchema = new mongoose.Schema({
    legajo: { type: Number, required: true },
    nombre: { type: String, required: true },
    reparticion: { type: String, required: true },
    funcion: { type: String, required: true },
    categoria: { type: Number, required: true },
    nivelAdicionalFondoEstimulo: { type: Number, required: true },
    sueldo: [{
        periodo: {type: Date, required: false},
        haberBruto: {type: Number, required: false}
        }],
    adicionalFondoEstimulo: {
        periodo: {type: Date, required: false},
        importeAFE: {type: Number, required: false}
        },
    createdAt: {type: Date, default: Date.now },
    creador: {type: String, required: false},
    editor: {type: String, required: false}
}, {collection: 'afe'}
);

const agenteDB = mongoose.model('agentes', agenteSchema);
export default agenteDB;