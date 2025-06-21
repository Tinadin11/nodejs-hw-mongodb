import { Router } from 'express';
import contactsRouter from "./contacts.js";
import authRouter from './auth.js';
import express from 'express';
import { UPLOAD_DIR } from '../constants/index.js';

const router = Router();
router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/uploads', express.static(UPLOAD_DIR));
export default router;

