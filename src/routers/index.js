import { Router } from 'express';
import contactsRouter from "./contacts.js";
import authRouter from './auth.js';
import express from 'express';
import { UPLOAD_DIR } from '../constants/index.js';
import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = Router();
router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/uploads', express.static(UPLOAD_DIR));
// Розпаковуємо масив middleware
router.use('/api-docs', ...swaggerDocs());

export default router;


// router.use('/api-docs', swaggerDocs());

