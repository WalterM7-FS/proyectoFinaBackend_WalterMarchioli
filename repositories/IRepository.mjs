class IRepository {

    
    obtenerTodos() {
        throw new Error('Método "obtenerTodos()" no implementado');
    }

    crearNuevoAgente(agente) {
        throw new Error('Método "crearNuevoAgente(agente)" no implementado');
    }
    
    eliminarAgente(id) {
        throw new Error('Método "eliminarAgente(id)" no implementado');
    }
    
    obtenerAgente(id) {
        throw new Error('Método "obtenerAgente(id)" no implementado');
    }

    editarAgente(id, datosActualizados) {
        throw new Error('Método "editarAgente(id, datosActualizados)" no implementado');
    }
    

}






export default IRepository;