import express from 'express';
import cors from 'cors'
import { connectDB } from './config/dbConfig.mjs';
import agentesRoutes from './routes/agentesRoutes.mjs';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';






const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set('view engine', 'ejs'); 
app.set('views', path.resolve('./views'));

app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static(path.resolve('./public')));

/*app.use((req,res,next) => {
    console.log('información recibida', req.body);
    next();
});*/

app.use('/api', agentesRoutes);


app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' });    
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
