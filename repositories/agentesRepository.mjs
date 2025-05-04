import agenteDB from "../models/agenteDB.mjs";

import IRepository from "./IRepository.mjs";
import axios from "axios";
import { isObjectIdOrHexString } from 'mongoose';



class agentesRepository extends IRepository {


    async obtenerTodos() {
        try {
            const ag = agenteDB.find({})
            console.log('Agentes obtenidos:', ag);
            return await ag;
        } catch (error) {
            console.error('Error al obtener todos los agentes:', error);
            throw error;
        }
    }


    async crearNuevoAgente(agente) {

        try {
            
            return await agenteDB.create(agente);

        } catch (error) {
            console.error('Error al intentar agregar al nuevo agente:', error);
            throw error;
        }

    }

    async eliminarAgente(id) {

        try {
            const agenteEliminado = await agenteDB.deleteOne({_id: id});
            return  agenteEliminado;
            
        } catch (error) {
            console.error('Error al intentar eliminar el agente:', error);
            throw error;
        }

    }
    
    async obtenerAgente(id) {

        try {
            return await agenteDB.findById(id);
            
        } catch (error) {
            console.error('Error al intentar obtener la información del agente:', error);
            throw error;
        }

    }

    async editarAgente(id, datosActualizados) {

        try {
            const agenteModificado = await agenteDB.findByIdAndUpdate(id, datosActualizados, {new: true});
            return agenteModificado;
            
        } catch (error) {
            console.error('Error al intentar editar el registro del agente:', error);
            throw error;
        }
    }

}


export default new agentesRepository();