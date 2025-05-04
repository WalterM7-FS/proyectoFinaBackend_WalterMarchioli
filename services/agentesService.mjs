import agentesRepository from '../repositories/agentesRepository.mjs';

/*export async function importarAPIPaises() {
    return await paisesRepository.importarPaisesLenguajeEspanol();
}*/



export async function obtenerTodosLosAgentes() {
    return await agentesRepository.obtenerTodos();
}

export async function crearAgente(agente) {
    return await agentesRepository.crearNuevoAgente(agente);    
}


export async function eliminarAgenteService(id) {
    return await agentesRepository.eliminarAgente(id);    
}

export async function obtenerAgentePorIdService(id) {
    return await agentesRepository.obtenerAgente(id);    
}

export async function modificarAgenteService(id, datosActualizados) {
    return await agentesRepository.editarAgente(id, datosActualizados);    
}

