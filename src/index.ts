import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/config/config';
import indexRoute from './routes';
import { seedUsers } from './database/seeds/users';

const app = express();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}


app.use('/api', indexRoute);

app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: 404,
        message: "Endpoint not found"
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        message: "Internal Server Error"
    });
});

const port = Number(process.env.PORT)
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

const startServer = async () => {
    try {
        await connect();
        await seedUsers();
        app.listen(port, host, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
            console.log(`Listening on ${host}:${port}`);
            console.log(`API Docs: http://${host}:${port}/api-docs`);
        });
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();