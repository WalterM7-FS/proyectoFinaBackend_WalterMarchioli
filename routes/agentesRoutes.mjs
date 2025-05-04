import express from 'express';
import { Router } from 'express';
import {  obtenerTodosLosAgentesController , formularioParaCrearAgentesController, agregarAgenteController, eliminarAgenteController, obtenerAgentePorIDController, modificarAgenteController, obtenerTodosLosAgentesControllerExt, obtenerAgentePorIdControllerExt, eliminarAgenteControllerExt, modificarAgenteControllerExt, agregarAgenteControllerExt } from '../controllers/agentesController.mjs';
import { crearAgente, modificarAgenteService, eliminarAgenteService } from '../services/agentesService.mjs';
/*import { registerValidationRules, preprocesarDatos, registerValidationRulesEdit } from '../validation/validationRules.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';*/



const router = express.Router();

/*
router.get('/importar', importarAPIPaisesController);
*/

router.get('/inicio', (req, res)=>{
    res.render('index', {title: 'Página de Inicio'})
})

router.get('/agentes', obtenerTodosLosAgentesController);


router.get('/crear', formularioParaCrearAgentesController);

router.post('/update/crear', /*preprocesarDatos, registerValidationRules(), handleValidationErrors,*/ agregarAgenteController);

router.post('/eliminar/:id', eliminarAgenteController);

router.get('/editar/:id', obtenerAgentePorIDController);

router.post('/editar/update/:id',/*preprocesarDatos, registerValidationRulesEdit(), handleValidationErrors,*/ modificarAgenteController);




/*------------>Rutas para consumir externamente como API>-------------*/

// Obtener todos los agentes en formato JSON
router.get('/ext/agentes', obtenerTodosLosAgentesControllerExt);


// Obtener un agente por ID
router.get('/ext/agentes/:id', obtenerAgentePorIdControllerExt);

// Crear un nuevo agente
router.post('/ext/agentes', agregarAgenteControllerExt);


// Modificar un agente existente
router.put('/ext/agentes/:id', modificarAgenteControllerExt);

// Eliminar un agente
router.delete('/ext/agentes/:id', eliminarAgenteControllerExt);



export default router;