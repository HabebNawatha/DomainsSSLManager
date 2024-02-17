import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sslServiceRouter from './routes/sslServiceRouter';


// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// Routes
app.use('/ssl-service', sslServiceRouter);
//app.use('/other-service', otherServiceRouter);

// Default route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
