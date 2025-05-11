import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.mjs';
import Role from '../models/Role.mjs';
import { connectDB } from '../config/dbConfig.mjs';

dotenv.config();

async function createUsers() {
    try {
        // Conectar a la base de datos
        await connectDB();
        console.log('Conectado a MongoDB');

        // Buscar roles admin y editor
        const adminRole = await Role.findOne({ name: 'admin' });
        const editorRole = await Role.findOne({ name: 'editor' });

        if (!adminRole || !editorRole) {
            console.log('Error: No se encontraron los roles "admin" o "editor"');
            return;
        }

        // Datos de los usuarios a crear
        const users = [
            {
                username: 'Administrador',
                email: 'administrador@nodo.com',
                password: '777', // Se encriptará con bcrypt
                role: adminRole._id
            },
            {
                username: 'Editor',
                email: 'editor@nodo.com',
                password: '888', // Se encriptará con bcrypt
                role: editorRole._id
            }
        ];

        // Crear los usuarios
        for (let userData of users) {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                console.log(`El usuario ${userData.email} ya existe.`);
                continue;
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Crear el nuevo usuario
            const user = new User({
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
                role: userData.role
            });

            // Guardar el usuario en la base de datos
            await user.save();
            console.log(`Usuario ${userData.username} creado exitosamente`);
        }
    } catch (error) {
        console.error('Error creando usuarios:', error);
    } finally {
        // Desconectar de la base de datos
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
    }
}

createUsers();