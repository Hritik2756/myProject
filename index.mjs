const startTime = Date.now();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { sequelize } from './src/models/index.mjs';
import routes from './src/routes/index.mjs';
import errorHandler from './src/middlewares/errorHandler.mjs';
const { SERVER_PORT, HOST } = process.env;


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Main application routes
app.use('/api', routes);

// Global Error Handler should be the last middleware
app.use(errorHandler);

sequelize.sync()
    .then(() => {
        console.log('Database connected and synchronized.');
        app.listen(SERVER_PORT, () => {
            console.log(`server started at http://${HOST}:${SERVER_PORT}`);
            console.log(`Time taken: ${Date.now() - startTime}ms`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
