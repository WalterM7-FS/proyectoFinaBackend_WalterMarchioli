import mongoose from 'mongoose';
import Permission from '../models/Permission.mjs';
import Role from '../models/Role.mjs';
import dotenv from 'dotenv'
import { connectDB } from '../config/dbConfig.mjs';

dotenv.config();

const initialPermissions = [
    {
        name: 'read:agentes',
        description: 'Puede ver agentes'
    },
    {
        name: 'create:agentes',
        description: 'Puede crear agentes'
    },
    {
        name: 'update:agentes',
        description: 'Puede actualizar agentes'
    },
    {
        name: 'delete:agentes',
        description: 'Puede eliminar agentes'
    }
];

const initialRoles = [
    {
        name: 'user',
        description: 'Usuario básico',
        permissions: ['read:agentes']
    },
    {
        name: 'editor',
        description: 'Editor de contenido',
        permissions: ['read:agentes', 'create:agentes']
    },
    {
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: ['read:agentes', 'create:agentes', 'update:agentes', 'delete:agentes']
    }
];

async function initializeRolesAndPermissions() {
    try {
        await connectDB()
        console.log('Conectado a MongoDB');

        // Limpiar colecciones existentes
        await Permission.deleteMany({});
        await Role.deleteMany({});
        console.log('Colecciones limpiadas');

        // Crear permisos
        const createdPermissions = await Permission.insertMany(initialPermissions);
        console.log('Permisos creados exitosamente');

        // Crear mapa de permisos
        const permissionsMap = createdPermissions.reduce((map, permission) => {
            map[permission.name] = permission._id;
            return map;
        }, {});

        // Crear roles con referencias a permisos
        const rolesToCreate = initialRoles.map(role => ({
            name: role.name,
            description: role.description,
            permissions: role.permissions.map(permName => permissionsMap[permName])
        }));

        await Role.insertMany(rolesToCreate);
        console.log('Roles creados exitosamente');

    } catch (error) {
        console.error('Error inicializando roles y permisos:', error);
    } finally {
        await mongoose.disconnect();
    }
}

initializeRolesAndPermissions();