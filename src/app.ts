import { config } from 'dotenv';
config();

import express from 'express';
import { logger } from './services/logger';

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});

server.on('close', () => {
  logger.info('Server has stopped');
});
