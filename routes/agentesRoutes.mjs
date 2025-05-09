import express from 'express';
import { Router } from 'express';
import {  obtenerTodosLosAgentesController , formularioParaCrearAgentesController, agregarAgenteController, eliminarAgenteController, obtenerAgentePorIDController, modificarAgenteController, obtenerTodosLosAgentesControllerExt, obtenerAgentePorIdControllerExt, eliminarAgenteControllerExt, modificarAgenteControllerExt, agregarAgenteControllerExt } from '../controllers/agentesController.mjs';
import { crearAgente, modificarAgenteService, eliminarAgenteService } from '../services/agentesService.mjs';
/*import { registerValidationRules, preprocesarDatos, registerValidationRulesEdit } from '../validation/validationRules.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';*/
import { register } from '../controllers/authController.mjs';
import { login } from '../controllers/authController.mjs';
import { authenticateToken, hasPermission } from '../middleware/authMiddleware.mjs'


const router = express.Router();


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
router.get('/ext/agentes', authenticateToken, hasPermission('read:agentes'), obtenerTodosLosAgentesControllerExt);


// Obtener un agente por ID
router.get('/ext/agentes/:id', authenticateToken, hasPermission('read:agentes'), obtenerAgentePorIdControllerExt);

// Crear un nuevo agente
router.post('/ext/agentes', authenticateToken, hasPermission('create:agentes'), agregarAgenteControllerExt);


// Modificar un agente existente
router.put('/ext/agentes/:id', authenticateToken, hasPermission('update:agentes'), modificarAgenteControllerExt);

// Eliminar un agente
router.delete('/ext/agentes/:id', authenticateToken, hasPermission('delete:agentes'), eliminarAgenteControllerExt);


//auth
router.post('/ext/agentes/register', register);
router.post('/ext/agentes/login', login);



export default router;