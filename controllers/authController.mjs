import authService from '../services/authService.mjs';

export const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.log('Error en registro:', error);
        res.status(400).json({ message: 'Error al registrar usuario.' });;
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        console.log('Error en login:', error);
        res.status(401).json({ message: 'Error al intentar login' });
    }
};