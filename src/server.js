import express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';
import { router as gamesRoutes } from './router.js';

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5001;

app.get('/healthy', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy!"
    });
});

app.use('/api', gamesRoutes)         // todas las rutas van a tener api en frente

dbConnection()
    .then(() => {
        console.log('Database connection established!');
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error establishing connection with the database:', error);
    });
