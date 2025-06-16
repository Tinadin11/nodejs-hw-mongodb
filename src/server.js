import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cookieParser());

  // Основні API маршрути
  app.use('/api', router);

  //  базовий маршрут
  app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'API is running' });
  });

  // обробка 404 і помилок
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


// app.get('/', (req, res) => {
//     res.json({ message: 'All work' });
//   });
//   app.use('/contacts', contactsRouter);




