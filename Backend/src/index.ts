import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { certificatesRouter } from './routes/certificatesRouter';
import { connectToDatabase } from './services/database.service';
import { usersRouter } from './routes/users.router';
import { dashboardRouter } from './routes/dashboard.router';
import { authenticateToken } from './middleware/AuthenticateToken';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());

connectToDatabase()
    .then(() => {
        console.log('Database connected successfully');

        // Routes
        app.use('/certificate', certificatesRouter);
        app.use('/users', usersRouter);
        app.use('/dashboard', authenticateToken, dashboardRouter);

        // Default route
        app.get('/', (req: Request, res: Response) => {
            res.send('Welcome to Express & TypeScript Server');
        });

        // Start server
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error('Database connection failed', error);
        process.exit(1); // Exit the process with a failure status code
    });
