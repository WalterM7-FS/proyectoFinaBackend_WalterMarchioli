import {body} from 'express-validator';



export const registerValidationRules = () => { return [
    
    body('name.official')
    .trim()
    .notEmpty().withMessage('Nombre del País es requerido')
    .isLength({min: 3, max:90}).withMessage('El nombre del País debe contener como mínimo 3 caracteres y como máximo 90 caracteres'),
    
    body('capital')
    .notEmpty()
    .withMessage('La/las capital/es del País son requeridos')
    .trim()
    .isArray({ min: 1})
    .custom(value => value.every( str => typeof str === 'string' && str.trim().length >= 3 && str.trim().length <= 90)).withMessage('Introduzca por cada Capital un texto entre 3 y 90 caracteres'),

    body('borders')
    .notEmpty()
    .withMessage('El/los límites del País son requeridos')
    .trim()
    .isArray({ min: 1})
    .custom(value => value.every( str => typeof str === 'string' && str.trim().length === 3 && /[A-Z]/.test(str))).withMessage('Introduzca por cada Límite un texto de 3 letras mayúsculas'),

    body('area')
    .notEmpty().withMessage('La superficie del país es requerida')
    .isNumeric().withMessage('Debe ingreser un número')
    .trim()
    .custom(value => value >= 0).withMessage('Introduzca un valor válido, no se admite valores negativos'), 
    
    body('population')
    .notEmpty().withMessage('La cantidad de la población del país es requerida')
    .isInt().withMessage('Debe ingreser un número entero')
    .trim()
    .custom(value => value >= 0).withMessage('Introduzca un valor válido, no se admite valores negativos'), 
    
];
};


export const preprocesarDatos = (req, res, next) => {
    
    

    req.body.independent = Boolean(req.body.independent);
       
    req.body.unMember = Boolean(req.body.unMember);
        

    if (req.body.capital && typeof req.body.capital === 'string') {
        // Transforma el string en un array, eliminando espacios adicionales
        req.body.capital = req.body.capital.split(',').map(capital => capital.trim());
    } else {
        // Si no existe el campo, lo inicializa como un array vacío
        req.body.capital = [];
    }
            
    
    if (req.body.borders && typeof req.body.borders === 'string') {
        // Transforma el string en un array, eliminando espacios adicionales y transfomándo en mayúsculas
        req.body.borders = req.body.borders.toUpperCase().split(',').map(borders => borders.trim());
    } else {
        // Si no existe el campo, lo inicializa como un array vacío
        req.body.borders = [];
    }

    if (req.body.timezones && typeof req.body.timezones === 'string') {
        // Transforma el string en un array, eliminando espacios adicionales
        req.body.timezones = req.body.timezones.split(',').map(timezones => timezones.trim());
    } else {
        // Si no existe el campo, lo inicializa como un array vacío
        req.body.timezones = [];
    }

    if (req.body.continents && typeof req.body.continents === 'string') {
        // Transforma el string en un array, eliminando espacios adicionales
        req.body.continents = req.body.continents.split(',').map(continents => continents.trim());
    } else {
        // Si no existe el campo, lo inicializa como un array vacío
        req.body.continents = [];
    }
    next();
};


export const registerValidationRulesEdit = () => { return [
    
    body('official')
    .trim()
    .notEmpty().withMessage('Nombre del País es requerido')
    .isLength({min: 3, max:90}).withMessage('El nombre del País debe contener como mínimo 3 caracteres y como máximo 90 caracteres'),
    
    body('capital')
    .notEmpty()
    .withMessage('La/las capital/es del País son requeridos')
    .trim()
    .isArray({ min: 1})
    .custom(value => value.every( str => typeof str === 'string' && str.trim().length >= 3 && str.trim().length <= 90)).withMessage('Introduzca por cada Capital un texto entre 3 y 90 caracteres'),

    body('borders')
    .notEmpty()
    .withMessage('El/los límites del País son requeridos')
    .trim()
    .isArray({ min: 1})
    .custom(value => value.every( str => typeof str === 'string' && str.trim().length === 3 && /[A-Z]/.test(str))).withMessage('Introduzca por cada Límite un texto de 3 letras mayúsculas'),

    body('area')
    .notEmpty().withMessage('La superficie del país es requerida')
    .isNumeric().withMessage('Debe ingreser un número')
    .trim()
    .custom(value => value >= 0).withMessage('Introduzca un valor válido, no se admite valores negativos'), 
    
    body('population')
    .notEmpty().withMessage('La cantidad de la población del país es requerida')
    .isInt().withMessage('Debe ingreser un número entero')
    .trim()
    .custom(value => value >= 0).withMessage('Introduzca un valor válido, no se admite valores negativos'), 
    
];
};
