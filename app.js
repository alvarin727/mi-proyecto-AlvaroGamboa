require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { connectDB } = require('./src/infrastructure/repositories/database/mongo/config');
const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(morgan('dev')); 
app.use(express.json()); 

// TODO: Cargar Rutas (lo haremos en Clase 2)
const productRoutes = require('./src/presentation/routes/product.routes');
app.use('/api/v1/products', productRoutes);

//prueba postman
const orderRoutes = require('./src/presentation/routes/order.routes');
app.use('/api/v1/orders', orderRoutes);


// Healthcheck Endpoint (para probar)
app.get('/api/v1/healthcheck', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
