import { obtenerTodosLosAgentes, crearAgente, eliminarAgenteService, obtenerAgentePorIdService, modificarAgenteService /*, importarAPIPaises*/} from '../services/agentesService.mjs';
import agenteDB from '../models/agenteDB.mjs'
import { validationResult } from 'express-validator';




export async function obtenerTodosLosAgentesController(req, res) {
    const agentes = await obtenerTodosLosAgentes();
    console.log('Agentes obtenidos:', agentes);
    res.render('dashboard', {agentes, title: 'Lista de Agentes'});
}


export async function formularioParaCrearAgentesController(req, res) {
    const agente = "";

    res.render('formularioCrearAgente', {errors: [], agenteDB, title: 'Agregar Agente'});
}

export async function agregarAgenteController(req, res) {
        try {
            const {
                legajo,
                nombre,
                reparticion,
                funcion,
                categoria,
                nivelAdicionalFondoEstimulo,
                creador
        } = req.body;
    
        let { periodo, haberBruto } = req.body;
    
        // Asegurar que sean arrays
        if (!Array.isArray(periodo)) periodo = [periodo];
        if (!Array.isArray(haberBruto)) haberBruto = [haberBruto];
    
        // Crear array de sueldos
        const sueldos = [];

if (periodo && haberBruto) {
    for (let i = 0; i < Math.max(periodo.length, haberBruto.length); i++) {
        const p = periodo[i];
        const brutoStr = haberBruto[i];

        const isPeriodoVacio = !p || p.trim() === '';
        const isBrutoVacio = !brutoStr || brutoStr.trim?.() === '';

        // Si ambos están vacíos, omitimos esta entrada
        if (isPeriodoVacio && isBrutoVacio) continue;

        const entrada = {};

        if (!isPeriodoVacio) {
            const fecha = new Date(p);
            if (!isNaN(fecha.getTime())) {
                entrada.periodo = fecha;
            }
        }

        if (!isBrutoVacio) {
            const bruto = parseFloat(brutoStr);
            if (isNaN(bruto)) {
                throw new Error(`Valor inválido de haberBruto: "${brutoStr}"`);
            }
            entrada.haberBruto = bruto;
        }

        sueldos.push(entrada);
    }
}
    
        const nuevoAgente = {
            legajo: Number(legajo),
            nombre,
            reparticion,
            funcion,
            categoria: Number(categoria),
            nivelAdicionalFondoEstimulo: Number(nivelAdicionalFondoEstimulo),
            sueldo: sueldos,
            creador
        };
    
        await crearAgente(nuevoAgente);
        res.redirect('../agentes');
        } catch (error) {
        console.error('Error al agregar agente:', error.message);
        res.status(400).send('Error al agregar agente: ' + error.message);
        }
    }

export async function eliminarAgenteController(req, res) {
    const id = req.params.id; 
    const agenteEliminado = await eliminarAgenteService(id);
    console.log(agenteEliminado)
    res.redirect('../agentes');
}


export async function obtenerAgentePorIDController(req, res) {
     
        const id = req.params.id;
        const agenteAModificar = await obtenerAgentePorIdService(id);
        console.log(agenteAModificar)
        res.render('editarAgentes', {agenteAModificar, title:'Modificar Agente'} );
}

export async function modificarAgenteController(req, res) {
    try {
        const { id } = req.params;
        const {
            legajo,
            nombre,
            reparticion,
            funcion,
            categoria,
            nivelAdicionalFondoEstimulo,
            sueldo,
            editor
        } = req.body;
    
        let sueldoFormateado = [];
    
            // Verificamos si sueldo viene como objeto válido (puede ser array o un solo objeto)
            if (sueldo && typeof sueldo === 'object') {
                const sueldoArray = Array.isArray(sueldo) ? sueldo : Object.values(sueldo);
    
                sueldoFormateado = sueldoArray.map((item, index) => {
                    const periodo = item.periodo ? new Date(item.periodo) : null;
                    const haberBruto = item.haberBruto ? Number(item.haberBruto) : null;
    
                    // Validación: ambos campos deben ser válidos
                    if (!isNaN(periodo?.getTime()) && !isNaN(haberBruto)) {
                        return { periodo, haberBruto };
                    } else {
                        console.warn(`Sueldo ignorado en índice ${index}: datos inválidos`, item);
                        return null;
                    }
                }).filter(Boolean); // Elimina los null
            }
    
            // Validación general de campos obligatorios
            if (!legajo || !nombre || !reparticion || !funcion || !categoria || !nivelAdicionalFondoEstimulo || !editor) {
                return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
            }
    
            const datosActualizados = {
                legajo: Number(legajo),
                nombre,
                reparticion,
                funcion,
                categoria: Number(categoria),
                nivelAdicionalFondoEstimulo: Number(nivelAdicionalFondoEstimulo),
                sueldo: sueldoFormateado,
                editor
            };
    
            const modificacionCursada = await modificarAgenteService(id, datosActualizados);
    
            if (!modificacionCursada) {
                console.error('Error al intentar insertar las modificaciones');
                return res.status(500).json({ mensaje: 'No se pudo actualizar el agente' });
            }
    
            res.redirect('../../agentes');
    
    } catch (error) {
        console.error('Error en modificarAgenteController:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
}



    //API DE CONSUMO EXTERNO
    
    export async function obtenerTodosLosAgentesControllerExt(req, res) {
        try {
            const agentes = await obtenerTodosLosAgentes();
            res.status(200).json(agentes);
        } catch (error) {
            console.error('Error al obtener todos los agentes:', error);
            res.status(500).json({ error: 'Error al obtener agentes' });
        }
    }


    export async function obtenerAgentePorIdControllerExt(req, res) {
        try {
            const { id } = req.params;
            const agente = await obtenerAgentePorIdService(id);
            if (!agente) {
                return res.status(404).json({ error: 'Agente no encontrado' });
            }
            res.status(200).json(agente);
        } catch (error) {
            console.error('Error al obtener agente por ID:', error);
            res.status(500).json({ error: 'Error al obtener el agente' });
        }
    }


    export async function agregarAgenteControllerExt(req, res) {
        try {
            const {
                legajo,
                nombre,
                reparticion,
                funcion,
                categoria,
                nivelAdicionalFondoEstimulo,
                creador
        } = req.body;
    
        let { periodo, haberBruto } = req.body;
    
        // Asegurar que sean arrays
        if (!Array.isArray(periodo)) periodo = [periodo];
        if (!Array.isArray(haberBruto)) haberBruto = [haberBruto];
    
        // Crear array de sueldos
        const sueldos = [];

    if (periodo && haberBruto) {
        for (let i = 0; i < Math.max(periodo.length, haberBruto.length); i++) {
            const p = periodo[i];
            const brutoStr = haberBruto[i];

            const isPeriodoVacio = !p || p.trim() === '';
            const isBrutoVacio = !brutoStr || brutoStr.trim?.() === '';

        // Si ambos están vacíos, omitimos esta entrada
        if (isPeriodoVacio && isBrutoVacio) continue;

        const entrada = {};

        if (!isPeriodoVacio) {
            const fecha = new Date(p);
            if (!isNaN(fecha.getTime())) {
                entrada.periodo = fecha;
            }
        }

        if (!isBrutoVacio) {
            const bruto = parseFloat(brutoStr);
            if (isNaN(bruto)) {
                throw new Error(`Valor inválido de haberBruto: "${brutoStr}"`);
            }
            entrada.haberBruto = bruto;
        }

        sueldos.push(entrada);
    }
}
    
        const nuevoAgente = {
            legajo: Number(legajo),
            nombre,
            reparticion,
            funcion,
            categoria: Number(categoria),
            nivelAdicionalFondoEstimulo: Number(nivelAdicionalFondoEstimulo),
            sueldo: sueldos,
            creador
        };
    
        const agenteCreado = await crearAgente(nuevoAgente);
        res.status(201).json(agenteCreado);
        } catch (error) {
        console.error('Error al agregar agente:', error.message);
        res.status(400).send('Error al agregar agente: ' + error.message);
        }
    }












    export async function eliminarAgenteControllerExt(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await eliminarAgenteService(id);
            if (!eliminado || eliminado.deletedCount === 0) {
                return res.status(404).json({ error: 'Agente no encontrado o ya eliminado' });
            }
            res.status(200).json({ mensaje: 'Agente eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar agente:', error);
            res.status(500).json({ error: 'Error al eliminar el agente' });
        }
    }


    export async function modificarAgenteControllerExt(req, res) {
        try {
            const { id } = req.params;
            const {
                legajo,
                nombre,
                reparticion,
                funcion,
                categoria,
                nivelAdicionalFondoEstimulo,
                sueldo,
                editor
            } = req.body;
    
            let sueldoFormateado = [];
    
            // Verificamos si sueldo viene como objeto válido (puede ser array o un solo objeto)
            if (sueldo && typeof sueldo === 'object') {
                const sueldoArray = Array.isArray(sueldo) ? sueldo : Object.values(sueldo);
    
                sueldoFormateado = sueldoArray.map((item, index) => {
                    const periodo = item.periodo ? new Date(item.periodo) : null;
                    const haberBruto = item.haberBruto ? Number(item.haberBruto) : null;
    
                    // Validación: ambos campos deben ser válidos
                    if (!isNaN(periodo?.getTime()) && !isNaN(haberBruto)) {
                        return { periodo, haberBruto };
                    } else {
                        console.warn(`Sueldo ignorado en índice ${index}: datos inválidos`, item);
                        return null;
                    }
                }).filter(Boolean); // Elimina los null
            }
            
            //para convertirlo en array a adicionalFondoEstimulo
            let adicionalFondoEstimuloFormateado = [];

            if (req.body.adicionalFondoEstimulo && typeof req.body.adicionalFondoEstimulo === 'object') {
                const afeArray = Array.isArray(req.body.adicionalFondoEstimulo)
                    ? req.body.adicionalFondoEstimulo
                    : Object.values(req.body.adicionalFondoEstimulo);
            
            adicionalFondoEstimuloFormateado = afeArray.map((item, index) => {
                const periodo = item.periodo ? new Date(item.periodo) : null;
                const importeAFE = item.importeAFE ? Number(item.importeAFE) : null;
            
                if (!isNaN(periodo?.getTime()) && !isNaN(importeAFE)) {
                    return { periodo, importeAFE };
                } else {
                    console.warn(`AFE ignorado en índice ${index}: datos inválidos`, item);
                    return null;
                }
            }).filter(Boolean);
            }
            
            // Validación general de campos obligatorios
            if (
                legajo === undefined || legajo === null ||
                nombre === undefined || nombre === '' ||
                reparticion === undefined || reparticion === '' ||
                funcion === undefined || funcion === '' ||
                categoria === undefined || categoria === null ||
                nivelAdicionalFondoEstimulo === undefined || nivelAdicionalFondoEstimulo === null ||
                editor === undefined || editor === ''
            ) {
                return res.status(400).json({ mensaje: 'Faltan campos obligatorios o están vacíos' });
            }
    
            const datosActualizados = {
                legajo: Number(legajo),
                nombre,
                reparticion,
                funcion,
                categoria: Number(categoria),
                nivelAdicionalFondoEstimulo: Number(nivelAdicionalFondoEstimulo),
                sueldo: sueldoFormateado,
                adicionalFondoEstimulo: adicionalFondoEstimuloFormateado, // modificación para array
                editor
            };
    
            const modificacionCursada = await modificarAgenteService(id, datosActualizados);
    
            if (!modificacionCursada) {
                console.error('Error al intentar insertar las modificaciones');
                return res.status(500).json({ mensaje: 'No se pudo actualizar el agente' });
            }
    
            res.status(200).json(modificacionCursada);
    
        } catch (error) {
            console.error('Error al modificar agente:', error);
            res.status(500).json({ mensaje: 'Error en el intento de actualizar el agente', error: error.message });
        }
    }
     
    

    

    
    